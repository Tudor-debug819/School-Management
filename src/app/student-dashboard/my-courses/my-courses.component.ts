import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../app.state';
import { selectAuthUser } from '../../auth/auth.selectors';
import { loadEnrolledCourses } from '../student.actions';
import { Course } from '../../admin-dashboard/course.model';
import { NgIf, NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { selectEnrolledCourses } from '../student.selectors';
import { unenrollFromCourse } from '../student.actions';

@Component({
  selector: 'app-my-courses',
  imports: [NgIf, NgFor, CommonModule],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.css'
})
export class MyCoursesComponent implements OnInit {

  enrolledCourses$: Observable<Course[]>;
  userId: string = '';

  constructor(private store: Store<AppState>) {
    this.enrolledCourses$ = this.store.select(selectEnrolledCourses);
  }

  ngOnInit(): void {
    this.store.select(selectAuthUser).subscribe(user => {
      if (user?.uid) {
        this.userId = user.uid;
        this.store.dispatch(loadEnrolledCourses({ studentId: user.uid }));
      }
    });

  }

  unenroll(courseId: string): void {
    if (this.userId) {
      this.store.dispatch(unenrollFromCourse({ courseId, studentId: this.userId }));
    }
  }

}
