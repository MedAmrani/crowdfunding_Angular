import { Injectable, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';



const API_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  private jwtToken: string= null ;

  constructor(private http: HttpClient) { }



  loadToken(){
    this.jwtToken = 'Bearer '+ localStorage.getItem('token');
  }

  // getCategories() :Observable<any>{
  //   console.log(this.jwtToken);
  //  if(this.jwtToken==null) this.loadToken();
  //  console.log(this.jwtToken);

  //   return this.http.get<Category[]>(API_URL+'categories', {headers : new HttpHeaders({'Authorization': 'this.jwtToken'})});
  //   // return this.http.get<Category[]>(API_URL+ 'projects', {headers: new HttpHeaders().set('Authorization', 'this.jwtToken')})

  //   // return this.http.get<TypeProject[]>(API_URL+ '/categories');
  // }



}
