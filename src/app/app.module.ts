import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from './Modules/login/login.module';

import { LogInComponent } from './Modules/login/log-in/log-in.component';
import { TodoListModule } from './Modules/todo-list/todo-list.module';
import { TodoListComponent } from './Modules/todo-list/todo-list/todo-list.component';
import { TodoformModule } from './Modules/todoform/todoform.module';
import { HeaderModule } from './Pages/header/header.module';
import { FooterModule } from './Pages/footer/footer.module';
import { MatGridListModule } from '@angular/material/grid-list';

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
    component: TodoListComponent
  }
];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HeaderModule,
    FooterModule,
    LoginModule,
    TodoListModule,
    TodoformModule,
    MatGridListModule
  ],
  exports: [ ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
