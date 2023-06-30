import { Component, OnInit, ViewChild } from '@angular/core';
import { TodoList } from '../todo-list';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { TodoformComponent } from '../../todoform/todoform/todoform.component';
import { MatPaginator } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';



@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  dataSource!: MatTableDataSource<TodoList>;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'phoneNumber', 'country', 'action'];

  isFormOpen = false;
  firstName!: string;
  lastName!: string;
  phoneNumber!: string;
  country!: string;
  selectedtodo: TodoList ={
    id: 0,
  firstName: '',
  lastName: '',
  phoneNumber: '',
  country: ''
  };

  todolist: TodoList[] = [];

  @ViewChild(MatPaginator)paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  constructor(private dialog: MatDialog,private _liveAnnouncer: LiveAnnouncer) {
this.dataSource = new MatTableDataSource(this.todolist)    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit() {
    this.loadTodos();
  }
  displayuname() {
    var getusernam = sessionStorage.getItem("email");
    return getusernam
}

  openForm() {
    const dialogRef = this.dialog.open(TodoformComponent, {
      width: '500px',
      data: this.selectedtodo
    });

    dialogRef.afterClosed().subscribe((result: TodoList) => {
      if (result) {
        if (result.id) {
          this.updatetodo(result);
        } else {
          this.addtodo(result);
        }
      }
      this.clearForm();
    });
    // this.isFormOpen = true;
  }

  addtodo(todo: TodoList){
    const newid = this.todolist.length +1;
    const newtodo: TodoList = {
      id: newid,
      firstName: todo.firstName,
      lastName: todo.lastName,
      phoneNumber: todo.phoneNumber,
      country: todo.country
    };
    this.todolist.push(newtodo);
    this.dataSource.data = this.todolist;
    this.saveTodos();
  }

  updatetodo(todo: TodoList){
    if (this.selectedtodo) {
      this.selectedtodo.firstName = todo.firstName;
      this.selectedtodo.lastName = todo.lastName;
      this.selectedtodo.phoneNumber = todo.phoneNumber;
      this.selectedtodo.country = todo.country;
      this.dataSource.data = this.todolist;
      this.saveTodos();
    }
  }

  editTodo(todo: TodoList) {
    this.selectedtodo = todo;
    // this.firstName = todo.firstName;
    // this.lastName = todo.lastName;
    // this.phoneNumber = todo.phoneNumber;
    // this.country = todo.country;
    // this.isFormOpen = true;
    this.openForm();
  }

  deleteTodo(todo: TodoList) {
    const index = this.todolist.findIndex(t => t.id === todo.id);
    if (index !== -1) {
      this.todolist.splice(index, 1);
      this.dataSource.data = this.todolist;
      this.saveTodos();
    }
  }

  private clearForm() {
    this.selectedtodo;
    this.firstName = '';
    this.lastName = '';
    this.phoneNumber = '';
    this.country = '';
  }

  private saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todolist));
    // this.dataSource = new MatTableDataSource<TodoList>(this.todolist);
  }

  private loadTodos() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      this.todolist = JSON.parse(savedTodos);
      this.dataSource = new MatTableDataSource<TodoList>(this.todolist);
    }
  }
}


  // closeForm() {
  //   this.isFormOpen = false;
  //   this.clearForm();
  // }

  // saveTodo() {
  //   const todo: TodoList = {
  //     id: Date.now(),
  //     firstName: this.firstName,
  //     lastName: this.lastName,
  //     phoneNumber: this.phoneNumber,
  //     country: this.country
  //   };

  //   // this.todos.push(todo);
  //   // this.saveTodos();
  //   // this.clearForm();
  //   if (this.selectedtodo) {
  //     this.updatetodo();
  //   }else{
  //     this.addtodo();
  //   }
  //   // this.todolist.push(todo);
  //   this.saveTodos();
  //   this.clearForm();
  //   this.isFormOpen = false;
  // }