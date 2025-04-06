import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from './environments/environment';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './app/auth/auth.effects';
import { authReducer } from './app/auth/auth.reducer';
import { CourseEffects } from './app/admin-dashboard/course.effects';
import { courseReducer } from './app/admin-dashboard/course.reducer';
import { teacherReducer } from './app/teacher-dashboard/teacher.reducer';
import { TeacherEffects } from './app/teacher-dashboard/teacher.effects';

bootstrapApplication(AppComponent, {
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideRouter(routes),
    provideStore({ auth: authReducer }),
    provideEffects([AuthEffects, CourseEffects, TeacherEffects]),
    provideState('courses', courseReducer),
    provideState('teacher', teacherReducer)
  ]
});

  