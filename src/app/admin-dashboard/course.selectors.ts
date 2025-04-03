import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CourseState } from "./course.reducer";

export const selectCourseState = createFeatureSelector<CourseState>('courses');
export const selectAllCourses = createSelector(selectCourseState, (state: CourseState) => state.courses);
export const selectCourseError = createSelector(selectCourseState, (state: CourseState) => state.error);
export const selectCourseLoading = createSelector(selectCourseState, (state: CourseState) => state.loading);