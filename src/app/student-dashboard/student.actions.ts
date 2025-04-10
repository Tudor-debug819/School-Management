import { createAction, props } from '@ngrx/store';
import { Course } from '../admin-dashboard/course.model';

export const loadAvailableCourses = createAction('[Student] Load Available Courses');
export const loadAvailableCoursesSuccess = createAction(
    '[Student] Load Available Courses Success',
    props<{ courses: Course[] }>()
);
export const loadAvailableCoursesFailure = createAction(
    '[Student] Load Available Courses Failure',
    props<{ error: string }>()
);

export const loadEnrolledCourses = createAction(
    '[Student] Load Enrolled Courses',
    props<{ studentId: string }>()
);

export const loadEnrolledCoursesSuccess = createAction(
    '[Student] Load Enrolled Courses Success',
    props<{ enrolledCourses: Course[] }>()
);

export const loadEnrolledCoursesFailure = createAction(
    '[Student] Load Enrolled Courses Failure',
    props<{ error: string }>()
);

export const enrollInCourse = createAction(
    '[Student] Enroll In Course',
    props<{ courseId: string, studentId: string, email: string }>()
);

export const unenrollFromCourse = createAction(
    '[Student] Unenroll From Course',
    props<{ courseId: string; studentId: string }>()
);