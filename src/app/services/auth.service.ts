import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';


const AUTH_API = 'http://localhost:8080/';

export const TOKEN = 'token'
export const AUTHENTICATED_USER = 'authenticaterUser'
export const ROLE = 'role'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwtToken=null;
  constructor(private http: HttpClient, private router:Router) { }

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'authenticate', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }
  getUser(){
    return localStorage.getItem(AUTHENTICATED_USER)
  }

  saveToken(jwt: string,user: User) {
    //console.log('tooooken'+ this.jwtToken)
    localStorage.setItem(TOKEN, jwt);
    localStorage.setItem(AUTHENTICATED_USER, user.username);

    this.loadToken();

  }


  loadToken(){
    return localStorage.getItem(TOKEN);

  }
  isUserLoggedIn() {
    let user = localStorage.getItem(AUTHENTICATED_USER)
    return !(user === null)
  }
  logout(){
    this.jwtToken = null;
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(AUTHENTICATED_USER);
    this.router.navigateByUrl('/home');
  }


  register(user): Observable<any> {
    return this.http.post(AUTH_API + 'user', {
      username: user.username,
      email: user.email,
      password: user.password,
      fullname: user.fullname
    }, httpOptions);
  }
}
