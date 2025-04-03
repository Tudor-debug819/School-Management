import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addCourse } from './course.actions';
import { Course } from './course.model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-course-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './course-form.component.html'
})
export class CourseFormComponent implements OnInit {
    courseForm!: FormGroup;
    isEditMode = false;
    courseId: string | null = null;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private store: Store
    ) { }

    ngOnInit(): void {
        this.courseForm = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
        });

        this.courseId = this.route.snapshot.paramMap.get('id');
        this.isEditMode = !!this.courseId;

        // TODO: Load and patch course data if edit mode
    }

    onSubmit(): void {
        if (this.courseForm.invalid) return;

        const course: Course = {
            ...this.courseForm.value
        };

        if(this.isEditMode && this.courseId){
            course.id = this.courseId;
        }



        this.store.dispatch(addCourse({ course }));
        this.router.navigate(['/admin-dashboard']);
    }
}