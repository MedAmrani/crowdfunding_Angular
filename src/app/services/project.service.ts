import { Injectable, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Category } from '../models/category.model';
import { TOKEN, AUTHENTICATED_USER } from './auth.service';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';



const API_URL = 'http://localhost:8080/';

const httpOptions = {
  headers: new HttpHeaders({ 'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtZWRhbXJhbmkiLCJleHAiOjE1ODA5NTkzOTYsImlhdCI6MTU4MDk0MTM5Nn0.8E0g4hQBEGk4WRKVbU-O4eluAUlQpilf9d7nrObsVZ46vwlgOC8Vb_6ERghvkar2XTAR_LHt3dV9lAVoEDrrVQ' })
};
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private jwtToken: string= localStorage.getItem(TOKEN);
  private user : string ;

  constructor(private http: HttpClient) { }





  getProjects() {
    console.log(this.jwtToken);
    // if(this.jwtToken==null) this.loadToken();
    return this.http.get<Project[]>(API_URL + 'projects');
    // return this.http.get<Category[]>(API_URL, {headers: new HttpHeaders().set('Authorization', 'this.jwtToken')})

    // return this.http.get<TypeProject[]>(API_URL+ '/categories');
  }
  getOneProject(id){
    return this.http.get<Category>(API_URL+ '/projects/'+id,{headers:new HttpHeaders({'Authorization': 'this.jwtToken'})});


  }
  loadUser(){
    this.user = localStorage.getItem(AUTHENTICATED_USER);
  }
  setProject(projet): Observable<any> {
    this.loadUser();
    console.log('sdfddfg'+projet.category);

    return this.http.post(API_URL + 'projects', {
      name: projet.name,
      description: projet.description,
      category : {id : projet.category},
      totalAmount: projet.amount,
    }, httpOptions);
  }
}
