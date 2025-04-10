import { NgIf, NgFor, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from '../admin-dashboard/course.model';
import { AppState } from '../app.state';
import { loadAvailableCourses, enrollInCourse, loadEnrolledCourses } from './student.actions';
import { selectAvailableCourses, selectStudentLoading, selectStudentError } from './student.selectors';
import { selectAuthUser } from '../auth/auth.selectors';

@Component({
  selector: 'app-student-dashboard',
  imports: [NgFor, NgIf, CommonModule],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent implements OnInit {

  courses$: Observable<Course[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  userEmail: string = '';
  userId: string = '';

  constructor(private store: Store<AppState>) {
    this.courses$ = this.store.select(selectAvailableCourses);
    this.loading$ = this.store.select(selectStudentLoading);
    this.error$ = this.store.select(selectStudentError);
  }

  ngOnInit(): void {
    this.store.dispatch(loadAvailableCourses());

    this.store.select(selectAuthUser).subscribe(user => {
      if (user?.uid && user?.email) {
        this.userId = user.uid;
        this.userEmail = user.email;
        this.store.dispatch(loadEnrolledCourses({ studentId: user.uid }));

      }
    });
  }

  enroll(courseId: string): void {
    if (this.userId && this.userEmail) {
      this.store.dispatch(enrollInCourse({ courseId, studentId: this.userId, email: this.userEmail }));
    }
  }

}
