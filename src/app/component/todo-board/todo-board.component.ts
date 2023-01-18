import { Component, OnInit } from '@angular/core';

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
  constructor() {  }

  ngOnInit(): void {
  }

}
