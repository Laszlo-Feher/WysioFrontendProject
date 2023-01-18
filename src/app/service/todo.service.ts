import { Injectable } from '@angular/core';
import { ITask } from '../model/task';
import { FormGroup } from '@angular/forms'
import { DatePipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { IndexedDBService } from './indexed-db.service';
import { Key } from 'ngx-indexed-db';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  tasks : ITask [] = [];
  newTask: ITask;
  detailedTask: ITask;
  
  private newTaskObservable = new BehaviorSubject<any>(null);
  currentTask = this.newTaskObservable.asObservable();

  constructor(public datepipe: DatePipe, private indexedDB: IndexedDBService) { }

  addTask(todoForm: FormGroup){
    this.newTask = {
      id: Date.now(),
      state: 0,
      priority: todoForm.value.priority,
      name: todoForm.value.name,
      description: todoForm.value.description,
      deadline: todoForm.value.deadline,
      created_at: this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss')?.toString()
    };
    this.newTaskObservable.next(this.newTask);
    this.indexedDB.addTask(this.newTask)
  }

  updateTask(task: ITask){
    this.indexedDB.updateTask(task);
  }

  deleteTask(taskKey: Key){
    this.indexedDB.deleteTask(taskKey);
  }
  
  async getAllTask() {
    const tasks = await this.indexedDB.getAllTasks().toPromise();
    return tasks;
  }
}
