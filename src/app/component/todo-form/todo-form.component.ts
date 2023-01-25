import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms'
import { ITask } from '../../model/task';
import { TodoService } from '../../service/todo.service';


interface Priority {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.sass']
})

export class TodoFormComponent implements OnInit{
  
  priorities: Priority[] = [
    {value: '0', viewValue: 'High'},
    {value: '1', viewValue: 'Medium'},
    {value: '2', viewValue: 'Low'},
  ];

  newTask: ITask;
  todoForm !: FormGroup;
  isEditEnabled: boolean = false;

  constructor(private todoservice: TodoService,private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      name : ['', Validators.required],
      priority : ['', Validators.required],
      deadline : ['', Validators.required],
      description : ['', Validators.required]
    });
  }

  addTaskToService(){
    this.todoservice.addTask(this.todoForm);
    this.todoForm.reset();
  }

}
