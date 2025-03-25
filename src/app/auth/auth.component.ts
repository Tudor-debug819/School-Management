import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms'
import { AuthService } from './auth.service';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { login } from './auth.actions';

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

  constructor(private authService: AuthService, private store: Store) { }

  login() {
    this.store.dispatch(login({email: this.email,password: this.password}))
  }


}


