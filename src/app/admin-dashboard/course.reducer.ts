import { createReducer, on } from "@ngrx/store";
import { Course } from "./course.model";

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