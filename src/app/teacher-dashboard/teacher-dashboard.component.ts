import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectTeacherCourses, selectStudentsPerCourse, selectTeacherLoading, selectTeacherError } from './teacher.selectors';
import { AppState } from '../app.state';
import { Course } from '../admin-dashboard/course.model';
import { loadTeacherCourses } from './teacher.actions';
import { NgIf, NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-teacher-dashboard',
  imports: [NgIf, NgFor, CommonModule],
  templateUrl: './teacher-dashboard.component.html',
  styleUrl: './teacher-dashboard.component.css'
})
export class TeacherDashboardComponent implements OnInit {

  courses$: Observable<Course[]>;
  studentsPerCourse$: Observable<{ [courseId: string]: any[] }>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store<AppState>) {
    this.courses$ = this.store.select(selectTeacherCourses);
    this.studentsPerCourse$ = this.store.select(selectStudentsPerCourse);
    this.loading$ = this.store.select(selectTeacherLoading);
    this.error$ = this.store.select(selectTeacherError);
  }

  ngOnInit(): void {
    const teacherId = 'vzQyr1JEedPxU26KEByIS1VyBbT2';
    this.store.dispatch(loadTeacherCourses({ teacherId }));
  }
}

