import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { CourseFormComponent } from './admin-dashboard/course-form.component';
import { MyCoursesComponent } from './student-dashboard/my-courses/my-courses.component';
import { LogsComponent } from './admin-dashboard/logs/logs/logs.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: AuthComponent },
    { path: 'admin-dashboard', component: AdminDashboardComponent },
    { path: 'admin/add-course', component: CourseFormComponent },
    { path: 'admin/edit-course/:id', component: CourseFormComponent },
    { path: 'teacher-dashboard', component: TeacherDashboardComponent },
    { path: 'student-dashboard', component: StudentDashboardComponent },
    { path: 'my-courses', component: MyCoursesComponent },
    { path: 'logs', component: LogsComponent },
]
