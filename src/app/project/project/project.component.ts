import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { Donation } from 'src/app/models/donation.model';
import { ProjectService } from 'src/app/services/project.service';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  id:number;
  project: Project;
  contributions:Donation[];
  montantTotalInv:any=0;

  constructor(private router: ActivatedRoute, private projectService: ProjectService) { }

  ngOnInit() {

      this.id = this.router.snapshot.params['id'];

      this.project = new Project(null,'','',0,0,new Date(),'');

      if(this.id) {
        this.projectService.getOneProject(this.id)
          .subscribe (
            data => console.log(data)
          );
      }

  }

}
