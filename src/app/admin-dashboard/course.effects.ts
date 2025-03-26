import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Firestore, collection, collectionData, addDoc, deleteDoc, doc } from '@angular/fire/firestore';
import { catchError, map, mergeMap, of, from } from 'rxjs';
import {
  loadCourses,
  loadCoursesSuccess,
  loadCoursesFailure,
  addCourse,
  addCourseFailure,
  addCourseSuccess
} from './course.actions';
import { Course } from './course.model';

@Injectable()
export class CourseEffects {
  constructor(
    private actions$: Actions,
    private firestore: Firestore
  ) { }

  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCourses),
      mergeMap(() => {
        const coursesRef = collection(this.firestore, 'courses');
        return collectionData(coursesRef, { idField: 'id' }).pipe(
          map(data => loadCoursesSuccess({ courses: data as Course[] })),
          catchError(error => of(loadCoursesFailure({ error: error.message })))
        );
      })
    )
  );

  addCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addCourse),
      mergeMap(({ course }) => {
        const coursesRef = collection(this.firestore, 'courses');
        return from(addDoc(coursesRef, course)).pipe(
map(docRef => addCourseSuccess({ course: { ...course, id: docRef.id } })),
          catchError(error => of(addCourseFailure({ error: error.message })))
        );
      })
    )
  );


}