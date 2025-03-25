import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms'
import { AuthService } from './auth.service';
import { RouterModule } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { login } from './auth.actions';
import { Observable } from 'rxjs';
import { selectAuthError } from './auth.selectors';
import { CommonModule } from '@angular/common';
import { selectAuthLoading } from './auth.selectors';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  email = '';
  password = '';
  errorMessage$: Observable<string | null>;
  loading$: Observable<boolean>;

  constructor(private authService: AuthService, private store: Store) {
    this.errorMessage$ = this.store.pipe(select(selectAuthError));
    this.loading$ = this.store.select(selectAuthLoading);
  }

  login() {
    this.store.dispatch(login({ email: this.email, password: this.password }))
  }


}


