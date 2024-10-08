import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public  loginStatusSubject=new Subject<boolean>();


  constructor(private http: HttpClient) { }

  public generateToken(user:any){

    return this.http.post(`${baseUrl}/generate-token`,user)

  }

  //login user: set token in localStorage
  public loginUser(token:any)
  {
     localStorage.setItem("token",token)
     return true
  }

  //isLogin : user is loggedbin or not
  public isLoggedIn(){
    let tokenStr=localStorage.getItem("token")
    if(tokenStr==undefined || tokenStr=='' || tokenStr==null){
      return false;
    }
    else{
      return true;
    }
  }

  //logout : remove token from localStorage
  public logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }

  //get token
  public getToken(){
    return localStorage.getItem("token")
  }

  public setUser(user:any){
    localStorage.setItem("user",JSON.stringify(user))
  }

  public getUser(){

    let userStr=localStorage.getItem("user")
    if(userStr!=null){
      return JSON.parse(userStr)
    }
    else{
     this.logout();
     return null;
    }
  }

  //get user role
  public getUserRole(){
    let user:any=this.getUser();
    return user.authorities[0].authority;
  }

  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`)

  }
}

