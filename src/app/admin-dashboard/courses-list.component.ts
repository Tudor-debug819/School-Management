import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from './course.model';
import { loadCourses, deleteCourse } from './course.actions';
import { selectAllCourses, selectCourseError, selectCourseLoading } from './course.selectors';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { CourseState } from './course.reducer';
import { Router } from '@angular/router';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-courses-list',
  imports: [NgIf, CommonModule],
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

  courses$: Observable<Course[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  cachedTeachers: any[] = [];
  cachedStudents: any[] = [];

  constructor(private store: Store, private router: Router, private firestore: Firestore) {
    this.courses$ = this.store.select(selectAllCourses);
    this.loading$ = this.store.select(selectCourseLoading);
    this.error$ = this.store.select(selectCourseError);
  }


  ngOnInit(): void {
    this.store.dispatch(loadCourses());

    const usersRef = collection(this.firestore, 'users');
    collectionData(usersRef, { idField: 'id' }).subscribe(users => {
      this.cachedTeachers = users.filter(u => u['role'] === 'teacher');
      this.cachedStudents = users.filter(u => u['role'] === 'student');
    });
  }

  goToAddCourse() {
    this.router.navigate(['/admin/add-course']);
  }

  editCourse(course: Course) {
    this.router.navigate(['/admin/edit-course', course.id]);
  }

  deleteCourse(courseId: string) {
    this.store.dispatch(deleteCourse({ courseId }));
  }

  getTeacherEmail(teacherId: string): string {
    const teacher = this.cachedTeachers.find(t => t.id === teacherId);
    return teacher?.email || 'Unassigned';
  }

  getStudentEmail(studentId: string): string {
    const student = this.cachedStudents.find(s => s.id === studentId);
    return student?.email || 'Student';
  }
}