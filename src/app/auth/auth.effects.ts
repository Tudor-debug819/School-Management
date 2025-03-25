import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { logout, logoutSuccess } from './auth.action'; 
import { exhaustMap, map, catchError } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
 
@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private auth: Auth,
    private router: Router
  ) {}
 
  logout$ = createEffect(() =>
    this.actions$.pipe(
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