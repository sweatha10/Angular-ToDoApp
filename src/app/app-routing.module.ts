import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './Modules/login/log-in/log-in.component';
import { TodoListComponent } from './Modules/todo-list/todo-list/todo-list.component';
import { AuthGuard } from './@core/auth.guard';

const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path:'login',
    component: LogInComponent
  },
  {
    path: 'todolist',
    component: TodoListComponent,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
