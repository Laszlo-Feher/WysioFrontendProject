import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JokeComponent } from './component/joke/joke.component';
import { HttpClientModule } from '@angular/common/http';
import { TodoBoardComponent } from './component/todo-board/todo-board.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { DatePipe } from '@angular/common';
import { TodoDetailComponent } from './component/todo-detail/todo-detail.component';
import { HomeComponent } from './component/home/home.component';
import { TodoTableComponent } from './component/todo-table/todo-table.component';
import { TodoFormComponent } from './component/todo-form/todo-form.component';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';

const dbConfig: DBConfig  = {
  name: 'ToDo',
  version: 1,
  objectStoresMeta: [{
    store: 'Tasks',
    storeConfig: { keyPath: 'id', autoIncrement: false },
    storeSchema: [
      { name: 'id', keypath: 'id', options: { unique: true } },
      { name: 'state', keypath: 'state', options: { unique: false } },
      { name: 'priority', keypath: 'priority', options: { unique: false } },
      { name: 'name', keypath: 'name', options: { unique: false } },
      { name: 'description', keypath: 'description', options: { unique: false } },
      { name: 'deadline', keypath: 'deadline', options: { unique: false } },
      { name: 'created_at', keypath: 'created_at', options: { unique: false } },
      { name: 'updated_at', keypath: 'updated_at', options: { unique: false } }
    ]
  }]
};
@NgModule({
  declarations: [
    AppComponent,
    JokeComponent,
    TodoBoardComponent,
    TodoDetailComponent,
    HomeComponent,
    TodoTableComponent,
    TodoFormComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    DragDropModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
