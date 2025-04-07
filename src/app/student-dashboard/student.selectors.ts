import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StudentState } from './student.reducer';

export const selectStudentState = createFeatureSelector<StudentState>('student');

export const selectAvailableCourses = createSelector(
    selectStudentState,
    (state: StudentState) => state.courses
);

export const selectStudentLoading = createSelector(
    selectStudentState,
    state => state.loading
);

export const selectStudentError = createSelector(
    selectStudentState,
    state => state.error
);