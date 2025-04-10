import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAuthUser, selectIsAuthenticated } from '../auth/auth.selectors';
import { logout } from '../auth/auth.actions';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isAuthenticated$: Observable<boolean>;
  authUser$: Observable<any>;
  constructor(private router: Router, private store: Store) {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
    this.authUser$=this.store.select(selectAuthUser);
  }

  onLogout() {
    this.store.dispatch(logout());
  }

}
