import { Component, Inject,OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TodoList } from '../../todo-list/todo-list';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todoform',
  templateUrl: './todoform.component.html',
  styleUrls: ['./todoform.component.scss']
})
export class TodoformComponent  implements OnInit{

  firstName!: string;
  lastName!: string;
  phoneNumber!: string;
  country!: string;

  todoForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<TodoformComponent>,@Inject(MAT_DIALOG_DATA) public data: TodoList) {}

  ngOnInit(){
    if (this.data) {
      this.firstName = this.data.firstName;
      this.lastName = this.data.lastName;
      this.phoneNumber = this.data.phoneNumber;
      this.country = this.data.country;
    }
    this.todoformgroup();
  }

  checkLength2(e: { key: string; preventDefault: () => void; }, input: { selectionStart: any; selectionEnd: any; value: any; }) {
    const functionalKeys = ['Backspace', 'ArrowRight', 'ArrowLeft'];


    if (functionalKeys.indexOf(e.key) !== -1) {
      return;
    }

    const keyValue = +e.key;
    if (isNaN(keyValue)) {
      e.preventDefault();
      return;
    }

    const hasSelection = input.selectionStart !== input.selectionEnd && input.selectionStart !== null;
    let newValue;
    if (hasSelection) {
      newValue = this.replaceSelection(input, e.key)
    } else {
      newValue = input.value + keyValue.toString();
    }

    if (+newValue > 10000000000 || newValue.length > 100000000) {
      e.preventDefault();
    }
  } 

  private replaceSelection(input: { value: any; selectionStart: any; selectionEnd: any; }, key: any) {
    const inputValue = input.value;
    const start = input.selectionStart;
    const end = input.selectionEnd || input.selectionStart;
    return inputValue.substring(0, start) + key + inputValue.substring(end + 1);
  }

  todoformgroup(){
    this.todoForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),
      country: new FormControl('', [Validators.required])
    });
  }

  saveTodo() {
    const todo: TodoList = {
      id: this.data ? this.data.id : 0,
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
      country: this.country
    };

    this.dialogRef.close(todo);
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
