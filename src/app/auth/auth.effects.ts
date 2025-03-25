import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { logout, logoutSuccess } from './auth.actions'; 
import { exhaustMap, map, catchError } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
 
@Injectable()
export class AuthEffects {
  private action$ = inject(Actions);
  private auth = inject(Auth);
  private router = inject(Router);
 
  logout$ = createEffect(() =>
    this.action$.pipe(
      ofType(logout),
      exhaustMap(() =>
        from(signOut(this.auth)).pipe(
          map(() => {
            this.router.navigate(['/login']);
            return logoutSuccess();
          }),
          catchError(() => of(logoutSuccess())) // still dispatch even if signOut fails
        )
      )
    )
  );
}