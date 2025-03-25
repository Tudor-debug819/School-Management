import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms'
import { AuthService } from './auth.service';
import { RouterModule } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { login } from './auth.actions';
import { Observable } from 'rxjs';
import { selectAuthError } from './auth.selectors';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, RouterModule, NgIf, CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  email = '';
  password = '';
  errorMessage$: Observable<string | null>;

  constructor(private authService: AuthService, private store: Store) {
    this.errorMessage$ = this.store.pipe(select(selectAuthError));
  }

  login() {
    this.store.dispatch(login({ email: this.email, password: this.password }))
  }


}


