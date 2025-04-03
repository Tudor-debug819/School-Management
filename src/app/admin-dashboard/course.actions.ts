import { createAction, props } from "@ngrx/store";
import { Course } from "./course.model";

//Load
export const loadCourses = createAction('[Course] Load Courses');
export const loadCoursesSuccess = createAction('[Course] Load Courses Success', props<{ courses: Course[] }>());
export const loadCoursesFailure = createAction('[Course] Load Courses Failure', props<{ error: string }>());

// Add
export const addCourse = createAction('[Course] Add Course', props<{ course: Course }>());
export const addCourseSuccess = createAction('[Course] Add Course Success', props<{ course: Course }>());
export const addCourseFailure = createAction('[Course] Add Course Failure', props<{ error: string }>());

// Delete
export const deleteCourse = createAction('[Course] Delete Course', props<{ courseId: string }>());
export const deleteCourseSuccess = createAction('[Course] Delete Course Success', props<{ courseId: string }>());
export const deleteCourseFailure = createAction('[Course] Delete Course Failure', props<{ error: string }>());

//Update
export const updateCourse = createAction('[Course] Update Course', props<{ course: Course }>());
export const updateCourseSuccess = createAction('[Course] Update Course Success', props<{ course: Course }>());
export const updateCourseFailure = createAction('[Course] Update Course Failure', props<{ error: string }>());