import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TeacherState } from './teacher.reducer';
import { AppState } from '../app.state';

export const selectTeacherState = createFeatureSelector<TeacherState>('teacher');

export const selectTeacherCourses = (state: AppState) => state.teacher.courses;

export const selectStudentsPerCourse = (state: AppState) => state.teacher.studentsPerCourse;

export const selectTeacherLoading = (state: AppState) => state.teacher.loading;

export const selectTeacherError = createSelector(
    selectTeacherState,
    (state: TeacherState) => state.error
);