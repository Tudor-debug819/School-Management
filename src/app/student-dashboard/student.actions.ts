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

export const enrollInCourse = createAction(
    '[Student] Enroll In Course',
    props<{ courseId: string, studentId: string, email: string }>()
);