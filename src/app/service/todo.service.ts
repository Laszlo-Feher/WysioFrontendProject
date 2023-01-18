import { Injectable } from '@angular/core';
import { ITask } from '../model/task';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms'
import { IndexedDBService } from 'src/app/service/indexed-db.service';
import { DatePipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  tasks : ITask [] = [];
  newTask: ITask;
  detailedTask: ITask;
  
  private newTaskObservable = new BehaviorSubject<any>(null);
  currentTask = this.newTaskObservable.asObservable();

  constructor(public datepipe: DatePipe, private indexedDBService: IndexedDBService) { }

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
  }
}
