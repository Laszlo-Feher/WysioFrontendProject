import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoBoardComponent } from './component/todo-board/todo-board.component';
import { TodoDetailComponent } from './component/todo-detail/todo-detail.component';

const routes: Routes = [
  {path: '', component: TodoBoardComponent},
  {path: 'todo/:id', component: TodoDetailComponent},
  {path: '**', redirectTo: "", pathMatch: 'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
