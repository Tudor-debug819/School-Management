import { createAction, props } from "@ngrx/store";

export const loadTeacherCourses = createAction('[Teacher] Load Courses', props<{ teacherId: string }>());
export const loadTeacherCoursesSuccess = createAction('[Teacher] Load Courses Succes', props<{ courses: any[] }>());
export const loadTeacherCoursesFailure = createAction('[Teacher] Load Courses Failure', props<{ error: string }>());

export const loadCourseStudents = createAction('[Teacher] Load Course Students', props<{ courseId: string }>());
export const loadCourseStudentsSuccess = createAction('[Teacher] Load Course Students', props<{ courseId: string, students: any[] }>());

export const updateStudentGrade = createAction('[Teacher] Update Student Grade', props<{ courseId: string, studentId: string, grade: number }>());
export const incrementStudentAbsence = createAction('[Teacher] Increment Student Absence', props<{ courseId: string, studentId: string }>());

