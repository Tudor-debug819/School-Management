import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { collection, collectionData, doc, updateDoc, arrayUnion, setDoc } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { of, from } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as StudentActions from './student.actions';

@Injectable()
export class StudentEffects {
    private actions$ = inject(Actions);
    private firestore = inject(Firestore);

    loadAvailableCourses$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StudentActions.loadAvailableCourses),
            mergeMap(() => {
                const courseRef = collection(this.firestore, 'courses');
                return collectionData(courseRef, { idField: 'id' }).pipe(
                    map((courses: any[]) => StudentActions.loadAvailableCoursesSuccess({ courses })),
                    catchError(error =>
                        of(StudentActions.loadAvailableCoursesFailure({ error: error.message }))
                    )
                );
            })
        )
    );

    enrollInCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StudentActions.enrollInCourse),
            mergeMap(({ courseId, studentId, email }) => {
                const courseRef = doc(this.firestore, `courses/${courseId}`);
                const studentRef = doc(this.firestore, `courses/${courseId}/students/${studentId}`);

                return from(Promise.all([
                    updateDoc(courseRef, {
                        studentIds: arrayUnion(studentId)
                    }),
                    setDoc(studentRef, {
                        studentId,
                        email,
                        grade: null,
                        absences: 0
                    }, { merge: true })
                ])).pipe(
                    map(() => ({ type: '[Student] Enrollment Success (Silent)' })),
                    catchError(error => of(StudentActions.loadAvailableCoursesFailure({ error: error.message })))
                );
            })
        )
    );
}