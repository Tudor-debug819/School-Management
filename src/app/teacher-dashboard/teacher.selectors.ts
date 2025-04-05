import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TeacherState } from './teacher.reducer';

export const selectTeacherState = createFeatureSelector<TeacherState>('teacher');

export const selectTeacherCourses = createSelector(
    selectTeacherState,
    (state: TeacherState) => state.courses
);

export const selectTeacherStudentsPerCourse = createSelector(
    selectTeacherState,
    (state: TeacherState) => state.studentsPerCourse
);

export const selectTeacherLoading = createSelector(
    selectTeacherState,
    (state: TeacherState) => state.loading
);

export const selectTeacherError = createSelector(
    selectTeacherState,
    (state: TeacherState) => state.error
);