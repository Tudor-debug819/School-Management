import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StudentState } from './student.reducer';

export const selectStudentState = createFeatureSelector<StudentState>('student');

export const selectAvailableCourses = createSelector(
    selectStudentState,
    (state) => {
        const enrolledIds = new Set(state.enrolledCourses.map(c => c.id));
        return state.courses.filter(c => !enrolledIds.has(c.id));
    }
);

export const selectEnrolledCourses = createSelector(selectStudentState, (state) => state.enrolledCourses);

export const selectStudentLoading = createSelector(
    selectStudentState,
    state => state.loading
);

export const selectStudentError = createSelector(
    selectStudentState,
    state => state.error
);