import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Firestore, collection, collectionData, query, where, doc, collectionGroup, getDocs, setDoc, updateDoc, increment } from '@angular/fire/firestore';
import { of, from } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as TeacherActions from './teacher.actions';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

@Injectable()
export class TeacherEffects {

    private actions$ = inject(Actions);
    private firestore = inject(Firestore);
    private store = inject(Store)

    loadTeacherCourses$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TeacherActions.loadTeacherCourses),
            mergeMap(({ teacherId }) => {
                const courseRef = collection(this.firestore, 'courses');
                const q = query(courseRef, where('teacherId', '==', teacherId));
                return collectionData(q, { idField: 'id' }).pipe(
                    map(courses => TeacherActions.loadTeacherCoursesSuccess({ courses })),
                    catchError(error => of(TeacherActions.loadTeacherCoursesFailure({ error: error.message })))
                );
            })
        )
    );

    loadStudentsForEachCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TeacherActions.loadTeacherCoursesSuccess),
            mergeMap(({ courses }) => {
                return courses.map(course =>
                    TeacherActions.loadCourseStudents({ courseId: course.id })
                );
            })
        )
    );

    loadCourseStudents$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TeacherActions.loadCourseStudents),
            mergeMap(({ courseId }) => {
                const studentsRef = collection(this.firestore, `courses/${courseId}/students`);
                return collectionData(studentsRef, { idField: 'id' }).pipe(
                    map(students => TeacherActions.loadCourseStudentsSuccess({ courseId, students })),
                    catchError(error => of(TeacherActions.loadTeacherCoursesFailure({ error: error.message })))
                );
            })
        )
    );

    updateStudentGrade$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TeacherActions.updateStudentGrade),
            mergeMap(({ courseId, studentId, grade }) => {
                const studentRef = doc(this.firestore, `courses/${courseId}/students/${studentId}`);
                return from(setDoc(studentRef, { grade }, { merge: true })).pipe(
                    map(() => ({ type: '[Teacher] Grade Updated (Silent)' })),
                    catchError(error => of(TeacherActions.loadTeacherCoursesFailure({ error: error.message })))
                );
            })
        )
    );

    incrementStudentAbsence$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TeacherActions.incrementStudentAbsence),
            mergeMap(({ courseId, studentId }) => {
                const studentRef = doc(this.firestore, `courses/${courseId}/students/${studentId}`);
                return from(updateDoc(studentRef, { absences: increment(1) })).pipe(
                    map(() => ({ type: '[Teacher] Absence Updated (Silent)' })),
                    catchError(error => of(TeacherActions.loadTeacherCoursesFailure({ error: error.message })))
                );
            })
        )
    );
}