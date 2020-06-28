import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/Category.service';
import { Category } from 'src/app/models/category.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-newproject',
  templateUrl: './newproject.component.html',
  styleUrls: ['./newproject.component.scss']
})
export class NewprojectComponent implements OnInit {
  categories: Category[];
  form: any = {};



  constructor(private categoryService: CategoryService, private projectService: ProjectService) { }

  ngOnInit() {
    this.getCategoriesProjects();

  }

  getCategoriesProjects(){
    this.categoryService.getCategories().subscribe(
      response => {

         this.categories = response;
      }
    );
  }
  onSubmit(){
    this.projectService.setProject(this.form).subscribe(
      data => {
        console.log(data);


      },
      err => {

      }
    );

  }

}
