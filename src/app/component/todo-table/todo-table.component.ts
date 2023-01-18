import { CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
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
  receiveNewTask: Subscription;

  constructor(private todoservice: TodoService) {  }

  ngOnInit(): void {
    this.todoservice.currentTask.subscribe(newTask => newTask != null ? this.board.columns[0].tasks.push(newTask) : null)
  }

  deleteTask(columnId: number, i: number){
    this.board.columns[columnId].tasks.splice(i,1);
  }

  updateTaskState(columnId: number, taskId: number){
    this.board.columns[columnId].tasks[taskId].state = columnId;
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