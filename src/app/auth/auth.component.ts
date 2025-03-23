import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms'
import { AuthService } from './auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, RouterModule],
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


