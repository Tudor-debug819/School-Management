import { Component } from '@angular/core';
import { CoursesListComponent } from './courses-list.component';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CoursesListComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

}
