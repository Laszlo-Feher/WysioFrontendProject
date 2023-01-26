import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { TodoDetailComponent } from './component/todo-detail/todo-detail.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'todo/:id', component: TodoDetailComponent},
  {path: '**', redirectTo: "", pathMatch: 'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
