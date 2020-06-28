import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-allprojects',
  templateUrl: './allprojects.component.html',
  styleUrls: ['./allprojects.component.scss']
})
export class AllprojectsComponent implements OnInit {
  projects: Project[];

  constructor(private projectService:ProjectService) { }

  ngOnInit() {
    this.getProjects();
  }
  getProjects(){
    this.projectService.getProjects().subscribe(
      response => {

         this.projects = response;
         console.log('the end')
      }
    );
  }

}
