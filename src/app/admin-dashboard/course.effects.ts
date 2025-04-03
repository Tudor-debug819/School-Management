import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Firestore, collection, collectionData, addDoc, deleteDoc, doc, setDoc } from '@angular/fire/firestore';
import { catchError, map, mergeMap, of, from } from 'rxjs';
import {
  loadCourses,
  loadCoursesFailure,
  loadCoursesSuccess,
  addCourse,
  addCourseFailure,
  addCourseSuccess,
  deleteCourse,
  deleteCourseFailure,
  deleteCourseSuccess,
  updateCourse,
  updateCourseFailure,
  updateCourseSuccess
} from './course.actions';
import { Course } from './course.model';

@Injectable({ providedIn: 'root' })
export class CourseEffects {
  // constructor(
  //   private actions$: Actions,
  //   private firestore: Firestore
  // ) { }

  private actions$ = inject(Actions);
  private firestore = inject(Firestore);

  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCourses),
      mergeMap(() => {
        const coursesRef = collection(this.firestore, 'courses');
        return collectionData(coursesRef, { idField: 'id' }).pipe(
          map(data => {
            return loadCoursesSuccess({ courses: data as Course[] });
          })

          //   loadCoursesSuccess({ courses: data as Course[] })),
          // catchError(error => of(loadCoursesFailure({ error: error.message })))
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

  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteCourse),
      mergeMap(({ courseId }) => {
        const courseDocRef = doc(this.firestore, `courses/${courseId}`);
        return from(deleteDoc(courseDocRef)).pipe(
          map(() => deleteCourseSuccess({ courseId })),
          catchError(error => of(deleteCourseFailure({ error: error.message })))
        );
      })
    )
  );

  updateCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCourse),
      mergeMap(({ course }) => {
        const courseDocRef = doc(this.firestore, `courses/${course.id}`);
        return from(setDoc(courseDocRef, course)).pipe(
          map(() => updateCourseSuccess({ course })),
          catchError(error => of(updateCourseFailure({ error: error.message })))
        );
      })
    )
  );


}