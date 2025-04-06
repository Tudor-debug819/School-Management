import { AuthState } from "./auth/auth.state";
import { CourseState } from "./admin-dashboard/course.reducer";
import { TeacherState } from "./teacher-dashboard/teacher.reducer";

export interface AppState{
    auth: AuthState;
    courses: CourseState;
    teacher: TeacherState;
}