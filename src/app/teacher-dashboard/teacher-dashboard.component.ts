import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectTeacherCourses, selectStudentsPerCourse, selectTeacherLoading, selectTeacherError } from './teacher.selectors';
import { AppState } from '../app.state';
import { Course } from '../admin-dashboard/course.model';
import { loadTeacherCourses } from './teacher.actions';
import { NgIf, NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { selectAuthUser } from '../auth/auth.selectors';
import { FormsModule } from '@angular/forms';
import { updateStudentGrade, incrementStudentAbsence } from './teacher.actions';



@Component({
  selector: 'app-teacher-dashboard',
  imports: [NgIf, NgFor, CommonModule, FormsModule],
  templateUrl: './teacher-dashboard.component.html',
  styleUrl: './teacher-dashboard.component.css'
})
export class TeacherDashboardComponent implements OnInit {

  courses$: Observable<Course[]>;
  studentsPerCourse$: Observable<{ [courseId: string]: any[] }>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  gradeInputs: { [studentId: string]: number } = {};

  constructor(private store: Store<AppState>) {
    this.courses$ = this.store.select(selectTeacherCourses);
    this.studentsPerCourse$ = this.store.select(selectStudentsPerCourse);
    this.loading$ = this.store.select(selectTeacherLoading);
    this.error$ = this.store.select(selectTeacherError);
  }

  ngOnInit(): void {
    this.store.select(selectAuthUser).subscribe(user => {
      if (user?.role === 'teacher') {
        this.store.dispatch(loadTeacherCourses({ teacherId: user.uid }));
      }
    });

    this.studentsPerCourse$.subscribe(studentsPerCourse => {
      for (const courseId in studentsPerCourse) {
        const students = studentsPerCourse[courseId];
        students.forEach(student => {
          this.gradeInputs[student.id] = student.grade;
        });
      }
    });

  }

  updateGrade(courseId: string, studentId: string) {
    const grade = this.gradeInputs[studentId];
    if (grade !== undefined && grade !== null) {
      this.store.dispatch(updateStudentGrade({ courseId, studentId, grade }));
    }

  }

  incrementAbsence(courseId: string, studentId: string) {
    this.store.dispatch(incrementStudentAbsence({ courseId, studentId }));
  }
}

