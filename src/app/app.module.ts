import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './home/home.component';
import { AllprojectsComponent } from './project/allprojects/allprojects.component';
import { ProjectComponent } from './project/project/project.component';
import { NewprojectComponent } from './project/newproject/newproject.component';
import { FooterComponent } from './footer/footer.component';
import { RouteGuardService } from './services/route-guard.service';
import { SecondGuardService } from './services/second-guard.service';

const appRoutes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    canActivate:[SecondGuardService]

  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate:[SecondGuardService]

  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate:[RouteGuardService]
  },
  {
    path: 'home',
    component: HomeComponent,

  },
  {
    path: 'projects',
    component: AllprojectsComponent,
    canActivate:[RouteGuardService]
  },
  {
    path: 'project/:id',
    component: ProjectComponent,
    canActivate:[RouteGuardService]
  },
  {
    path: 'newproject',
    component: NewprojectComponent,
    canActivate:[RouteGuardService]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }


]
@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AllprojectsComponent,
    ProjectComponent,
    NewprojectComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
