import { CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Key } from 'ngx-indexed-db';
import { Subscription } from 'rxjs';
import { IBoard } from 'src/app/model/board';
import { ITask } from '../../model/task';
import { TodoService } from '../../service/todo.service';

@Component({
  selector: 'app-todo-table',
  templateUrl: './todo-table.component.html',
  styleUrls: ['./todo-table.component.sass']
})

export class TodoTableComponent implements OnInit{
  
  board: IBoard = {
    columns: [
      {
        id: 0,
        name: "TODO",
        tasks: [],
      },
      {
        id: 1,
        name: "IN PROGRESS",
        tasks: []
      },
      {
        id: 2,
        name: "DONE",
        tasks: []
      },
    ]
  };

  newTask: ITask;
  allTask: ITask[];
  taskToUpdate: ITask;
  taskToDeleteKey: Key;
  receiveNewTask: Subscription;

  constructor(private todoservice: TodoService) {  }

  ngOnInit(): void {
    this.getAllTask();
    this.todoservice.currentTask.subscribe(newTask => newTask != null ? this.board.columns[0].tasks.push(newTask) : null)
  }

  deleteTask(columnId: number, i: number){
    this.taskToDeleteKey = this.board.columns[columnId].tasks[i].id as Key;
    this.todoservice.deleteTask(this.taskToDeleteKey);
    this.board.columns[columnId].tasks.splice(i,1);
  }

  updateTaskState(columnId: number, taskId: number){
    this.taskToUpdate = this.board.columns[columnId].tasks[taskId];
    this.taskToUpdate.state = columnId;
    this.todoservice.updateTask(this.taskToUpdate);
  }

  async getAllTask(){
    this.todoservice.getAllTask().then(tasks => this.initAllTask(tasks as ITask[]));
  }

  initAllTask(tasks: ITask[]){
    const columnMapping: { [key: number]: ITask[] } = {
      0: this.board.columns[0].tasks,
      1: this.board.columns[1].tasks,
      2: this.board.columns[2].tasks
  }
  tasks.forEach(task => columnMapping[task.state].push(task))
  }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      this.updateTaskState(Number(event.container.id.charAt(event.container.id.length-1)),event.currentIndex);
    }
  }

}