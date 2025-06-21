import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public formError: string = '';
  public credentials = {
    name: '', // name is not needed for login but part of the model
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  public onLoginSubmit(): void {
    this.formError = '';
    if (!this.credentials.email || !this.credentials.password) {
      this.formError = 'All fields are required, please try again';
    } else {
      this.doLogin();
    }
  }

  private async doLogin(): Promise<void> {
    try {
      const user: User = {
        name: this.credentials.name,
        email: this.credentials.email
      };

       // console.log('LoginComponent::doLogin'); 
       // console.log(this.credentials);
      
      const authRequest = { ...user, password: this.credentials.password };
      await this.authenticationService.login(authRequest);
      this.router.navigateByUrl(''); 
    } catch (err) {
      this.formError = 'Incorrect email or password.';
      console.error(err);
    }
  }
}