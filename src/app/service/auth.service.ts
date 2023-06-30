import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  login(data: any){
    console.log("SERVER");
    
    return this.http.post("https://reqres.in/api/login",data).subscribe((res:any)=>{
      sessionStorage.setItem("token",res.token);
      this.router.navigate(['./todolist'])
    });
  }

  isloggedin(){
    return !!sessionStorage.getItem("token");
  }

  logout(){
    return this.router.navigate(['./login'])
  }

  // apiurl = 'https://reqres.in/api/login';

  // GetAll(obj: any) : Observable<any> {
  //   return this.http.post(this.apiurl, obj);
  // }

  // // Getbycode(code:any){
  // //   return this.http.get(this.apiurl+'/'+code);
  // // }

}
