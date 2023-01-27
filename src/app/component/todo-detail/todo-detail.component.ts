import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms'
import { ITask } from '../../model/task';
import { TodoService } from '../../service/todo.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { takeUntil } from 'rxjs';


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

  updatableTask: ITask;
  todoForm !: FormGroup;
  id: number;

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

  validateFormAfterFetch(){
    this.todoForm = this.formBuilder.group({
      name : [this.updatableTask.name, [Validators.required, Validators.maxLength(20)]],
      priority : [this.updatableTask.priority, Validators.required],
      deadline : [this.updatableTask.deadline, Validators.required],
      description : [this.updatableTask.description, [Validators.required, Validators.maxLength(80)]],
      id : [this.updatableTask.id],
      state : [this.updatableTask.state],
      created_at : [this.updatableTask.created_at]
    });
  }

  subscribeToRouteParams(){
    this.route.params.pipe().subscribe(params => {
      this.id = params['id'];
      this.getTaskById(Number(this.id));
    });
  }

  async getTaskById(key: IDBValidKey){
    this.todoservice.getByKey(key).then(task => {
      this.updatableTask = task as ITask,
      this.validateFormAfterFetch()
    });
  }

  updateTaskToService(){
    this.todoservice.updateTaskFromForm(this.todoForm);
    this.todoForm.reset();
  }

  

}
