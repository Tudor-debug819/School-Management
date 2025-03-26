import { createReducer, on } from "@ngrx/store";
import { Course } from "./course.model";
import * as CourseActions from './course.actions'

export interface CourseState {
    courses: Course[];
    loading: boolean;
    error: string | null;
}

export const initialCourseState: CourseState = {
    courses: [],
    loading: false,
    error: null
}

export const courseReducer = createReducer(
    initialCourseState,
   
    // Load courses
    on(CourseActions.loadCourses, state => ({
      ...state,
      loading: true,
      error: null
    })),
    on(CourseActions.loadCoursesSuccess, (state, { courses }) => ({
      ...state,
      loading: false,
      courses
    })),
    on(CourseActions.loadCoursesFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error
    })),
   
    // Add course
    on(CourseActions.addCourse, state => ({
      ...state,
      loading: true
    })),
    on(CourseActions.addCourseSuccess, (state, { course }) => ({
      ...state,
      loading: false,
  courses: [...state.courses, course]
    })),
    on(CourseActions.addCourseFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error
    })),
   
    // Delete course
    on(CourseActions.deleteCourse, state => ({
      ...state,
      loading: true
    })),
    on(CourseActions.deleteCourseSuccess, (state, { courseId }) => ({
      ...state,
      loading: false,
  courses: state.courses.filter(course => course.id !== courseId)
    })),
    on(CourseActions.deleteCourseFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error
    }))
  );