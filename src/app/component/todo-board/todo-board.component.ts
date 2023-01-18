import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms'
import { Subscription } from 'rxjs';
import { IndexedDBService } from 'src/app/service/indexed-db.service';
import { ITask } from '../../model/task';
import { TodoService } from '../../service/todo.service';


interface Priority {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-todo-board',
  templateUrl: './todo-board.component.html',
  styleUrls: ['./todo-board.component.sass']
})

export class TodoBoardComponent implements OnInit{
  
  priorities: Priority[] = [
    {value: '0', viewValue: 'High'},
    {value: '1', viewValue: 'Medium'},
    {value: '2', viewValue: 'Low'},
  ];
  newTask: ITask;
  receiveNewTask: Subscription;


  //db: IndexedDB;
  todoForm !: FormGroup;
  tasks : ITask [] = [];


  inprogress : ITask [] = [];
  done : ITask [] = [];
  updateIndex!: any;

  constructor(private todoservice: TodoService,private fb : FormBuilder, public datepipe: DatePipe, private indexedDBService: IndexedDBService) {
    
   }

  ngOnInit(): void {
    this.todoservice.currentTask.subscribe(newTask => newTask != null ? this.tasks.push(newTask) : null)
  }

  deleteTask(i: number){
    this.tasks.splice(i,1);
  }

  deleteInProgress(i: number){
    this.inprogress.splice(i,1);
  }

  deleteDone(i: number){
    this.done.splice(i,1);
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
      console.log(event);
    }
  }


}
