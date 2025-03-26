import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { logout, logoutSuccess, login, loginSuccess, loginFailure } from './auth.actions';
import { exhaustMap, switchMap, map, catchError } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthEffects {
  private action$ = inject(Actions);
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.action$.pipe(
      ofType(login),
      exhaustMap(({ email, password }) =>
        from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
          switchMap(userCredential => {
            const uid = userCredential.user.uid;
            const email = userCredential.user.email ?? '';
            const userRef = doc(this.firestore, `users/${uid}`);
            return from(getDoc(userRef)).pipe(
              map(userDoc => {
                const role = userDoc.data()?.['role'];
                return loginSuccess({ user: { uid, email, role } });
              })
            );
          }),
          catchError(error => of(loginFailure({ error: error.message })))
        )
      )
    )
  );

  redirectAfterLogin$ = createEffect(() =>
    this.action$.pipe(
      ofType(loginSuccess),
      tap(({ user }) => {
        switch (user.role) {
          case 'admin':
            this.router.navigate(['/admin-dashboard']);
            break;
          case 'teacher':
            this.router.navigate(['/teacher-dashboard']);
            break;
          case 'student':
            this.router.navigate(['/student-dashboard']);
            break;
          default:
            this.router.navigate(['/home']);
        }
      })
    ),
    { dispatch: false } 
  );

  logout$ = createEffect(() =>
    this.action$.pipe(
      ofType(logout),
      exhaustMap(() =>
        from(signOut(this.auth)).pipe(
          map(() => {
            this.router.navigate(['/login']);
            return logoutSuccess();
          }),
          catchError(() => of(logoutSuccess()))
        )
      )
    )
  );
}