import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'crowdfunding';
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isLoggedIn = !!this.authService.loadToken();

    if (this.isLoggedIn) {
      const user = this.authService.getUser();


      this.username = user;
    }
  }

  logout() {
    this.authService.logout();
    window.location.reload();
  }
}
