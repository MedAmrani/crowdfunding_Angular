import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  usernameConnecte: string='';


  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit() {
    // if (this.tokenStorage.getToken()) {
    //   this.isLoggedIn = true;
    //   this.roles = this.tokenStorage.getUser().roles;
    // }
  }

  onSubmit() {
    this.authService.login(this.form).subscribe(
      data => {
        // this.tokenStorage.saveToken(data.accessToken);
        // this.tokenStorage.saveUser(data);

        // this.isLoginFailed = false;
        // this.isLoggedIn = true;
        // this.roles = this.tokenStorage.getUser().roles;
        // this.reloadPage();

        console.log(data)

        let jwt = data.token;
        //console.log(jwt);
        this.usernameConnecte = this.form.username;

        this.authService.saveToken(jwt,this.form);
        // this.getProfile();
        console.log(data);
        this.reloadPage();



      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }

    );
  }




  reloadPage() {
    window.location.reload();
  }
}
