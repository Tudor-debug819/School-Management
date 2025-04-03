import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addCourse, updateCourse } from './course.actions';
import { Course } from './course.model';
import { CommonModule } from '@angular/common';
import { selectAllCourses } from './course.selectors';

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

        if (this.isEditMode && this.courseId) {
            this.store.select(selectAllCourses).subscribe(courses => {
                const course = courses.find(c => c.id === this.courseId);
                if (course) {
                    this.courseForm.patchValue(course);
                }
            });
        }
    }

    onSubmit(): void {
        if (this.courseForm.invalid) return;

        let course: Course = {
            ...this.courseForm.value
        };

        if (this.isEditMode && this.courseId) {
            course = { ...course, id: this.courseId };
        }

        if (this.isEditMode) {
            this.store.dispatch(updateCourse({ course }));
        } else {
            this.store.dispatch(addCourse({ course }));
        }


        this.router.navigate(['/admin-dashboard']);
    }
}