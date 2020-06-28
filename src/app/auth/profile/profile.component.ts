import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.currentUser = this.authService.getUser();
    console.log(this.currentUser);
  }

}
