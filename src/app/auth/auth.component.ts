import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms'
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  imports: [FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService) { }

  login() {
    this.authService.login(this.email, this.password);
  }


}


