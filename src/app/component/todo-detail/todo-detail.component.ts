import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms'
import { ITask } from '../../model/task';
import { TodoService } from '../../service/todo.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


interface Priority {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.sass']
})

export class TodoDetailComponent implements OnInit{
  
  priorities: Priority[] = [
    {value: '0', viewValue: 'High'},
    {value: '1', viewValue: 'Medium'},
    {value: '2', viewValue: 'Low'},
  ];

  newTask: ITask;
  todoForm !: FormGroup;
  id: number;
  isEditEnabled: boolean = false;

  constructor(private route: ActivatedRoute, private todoservice: TodoService,private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.subscribeToRouteParams();
    this.validateForm();
  }

  validateForm(){
    this.todoForm = this.formBuilder.group({
      name : ['', Validators.required],
      priority : ['', Validators.required],
      deadline : ['', Validators.required],
      description : ['', Validators.required]
    });
  }

  subscribeToRouteParams(){
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  addTaskToService(){
    this.todoservice.addTask(this.todoForm);
    this.todoForm.reset();
  }

}
