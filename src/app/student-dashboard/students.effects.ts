import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { collection, collectionData, doc, deleteDoc, setDoc, getDoc } from '@angular/fire/firestore';
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
                const studentRef = doc(this.firestore, `courses/${courseId}/students/${studentId}`);
                return from(setDoc(studentRef, {
                    studentId,
                    email,
                    grade: null,
                    absences: 0
                }, { merge: true })).pipe(
                    map(() => StudentActions.loadEnrolledCourses({ studentId })),
                    catchError(error =>
                        of(StudentActions.loadAvailableCoursesFailure({ error: error.message }))
                    )
                );
            })
        )
    );

    loadEnrolledCourses$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StudentActions.loadEnrolledCourses),
            mergeMap(({ studentId }) => {
                const coursesRef = collection(this.firestore, 'courses');

                return collectionData(coursesRef, { idField: 'id' }).pipe(
                    mergeMap(async (courses: any[]) => {
                        const enrolledCourses: any[] = [];

                        for (const course of courses) {
                            const studentDocRef = doc(this.firestore, `courses/${course.id}/students/${studentId}`);
                            const studentSnap = await getDoc(studentDocRef);
                            if (studentSnap.exists()) {
                                enrolledCourses.push(course);
                            }
                        }

                        return StudentActions.loadEnrolledCoursesSuccess({ enrolledCourses });
                    }),
                    catchError(error =>
                        of(StudentActions.loadEnrolledCoursesFailure({ error: error.message }))
                    )
                );
            })
        )
    );

    unenrollFromCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StudentActions.unenrollFromCourse),
            mergeMap(({ courseId, studentId }) => {
                const studentRef = doc(this.firestore, `courses/${courseId}/students/${studentId}`);
                return from(deleteDoc(studentRef)).pipe(
                    map(() => StudentActions.loadEnrolledCourses({ studentId })),
                    catchError(error =>
                        of(StudentActions.loadAvailableCoursesFailure({ error: error.message }))
                    )
                );
            })
        )
    );
}