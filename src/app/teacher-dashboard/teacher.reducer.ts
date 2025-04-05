import { createReducer, on } from '@ngrx/store';
import * as TeacherActions from './teacher.actions'

export interface TeacherState {
    courses: any[];
    studentsPerCourse: { [courseId: string]: any[] };
    loading: boolean;
    error: string | null;
}

export const initialState: TeacherState = {
    courses: [],
    studentsPerCourse: {},
    loading: false,
    error: null
};

export const teacherReducer = createReducer(
    initialState,

    on(TeacherActions.loadTeacherCourses, state => ({
        ...state,
        loading: true,
        error: null
    })),

    on(TeacherActions.loadTeacherCoursesSuccess, (state, { courses }) => ({
        ...state,
        courses,
        loading: false
    })),

    on(TeacherActions.loadTeacherCoursesFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    on(TeacherActions.loadCourseStudentsSuccess, (state, { courseId, students }) => ({
        ...state,
        studentsPerCourse: {
            ...state.studentsPerCourse,
            [courseId]: students
        }
    }))
);