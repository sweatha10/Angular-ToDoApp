import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@shared/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  hide: boolean = true;
  loginForm: FormGroup | any;
  userdata: any;

  constructor(private router: Router, private service: AuthService) { 
    if (this.service.isloggedin()) {
     this.router.navigateByUrl('/todolist');
    }
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  getEmailErrorMessage() {
    if (this.loginForm.get('email')?.hasError('required')) {
      return 'Email is required';
    }
    return this.loginForm.get('email')?.hasError('email') ? 'Invalid Email' : '';
  }

  getPasswordErrorMessage(){
    if (this.loginForm.get('password')?.hasError('required')) {
      return 'Password is required';
    }
    return this.loginForm.get('password')?.hasError('minlength') ? 'Invalid Password' : '';
  }
  
  loginProcess(data:any){
    console.warn(data);
    sessionStorage.setItem("email",this.loginForm.value.email);
   this.service.login(data)
  }
}


  // onLogin() {
  //   if (this.loginForm.valid) {
  //     this.service.Getbycode(this.loginForm.value.password).subscribe(res => {
  //       this.userdata = res;
  //     });

  //   }
  //   if (this.loginForm.valid) {
  //     this.service.GetAll(this.loginForm.value.email).subscribe((res: any) => {
  //       this.userdata = res;
  //       console.log(this.userdata);
        
  //       localStorage.setItem('token', res.token)
  //     })
  //     this.router.navigate(['./todolist'])
  //   }
  // }





  //   emailcontrol:FormControl = new FormControl('',Validators.email);
  //   passwordcontrol:FormControl = new FormControl('',[Validators.required, Validators.maxLength(8)]);

  //   loginForm! : FormGroup;

  //   constructor(private router: Router) {   
  //     email: String;
  //     password: String;
  //   }
  //   ngOnInit(){

  //   }
  //  onLogin(){}



