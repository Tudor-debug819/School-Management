import { createReducer, on } from '@ngrx/store';
import * as StudentActions from './student.actions';
import { Course } from '../admin-dashboard/course.model';

export interface StudentState {
    courses: Course[];
    enrolledCourses: Course[];
    loading: boolean;
    error: string | null;
}

export const initialState: StudentState = {
    courses: [],
    enrolledCourses: [],
    loading: false,
    error: null
};

export const studentReducer = createReducer(
    initialState,
    on(StudentActions.loadAvailableCourses, state => ({ ...state, loading: true })),
    on(StudentActions.loadEnrolledCoursesSuccess, (state, { enrolledCourses }) => ({ ...state, enrolledCourses })),
    on(StudentActions.loadAvailableCoursesSuccess, (state, { courses }) => ({
        ...state,
        loading: false,
        courses
    })),
    on(StudentActions.loadAvailableCoursesFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    }))
);