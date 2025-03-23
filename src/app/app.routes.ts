import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: AuthComponent}, 
    {path: 'admin-dashboard', component: AdminDashboardComponent},
    {path: 'teacher-dashboard', component: TeacherDashboardComponent},
    {path: 'student-dashboard', component: StudentDashboardComponent}
]
