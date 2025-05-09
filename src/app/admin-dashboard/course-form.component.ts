import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addCourse, updateCourse } from './course.actions';
import { Course } from './course.model';
import { CommonModule } from '@angular/common';
import { selectAllCourses } from './course.selectors';
import { Observable } from 'rxjs';
import { collectionData, Firestore, doc, setDoc } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { map } from 'rxjs';

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
    teachers$!: Observable<any[]>;
    students$!: Observable<any[]>;
    cachedStudents: any[] = [];
    firestore=inject(Firestore);

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private store: Store,
        //private firestore: Firestore
    ) { }

    ngOnInit(): void {

        this.teachers$ = collectionData(collection(this.firestore, 'users'), {
            idField: 'id',
        }).pipe(
            map(users => users.filter(user => user['role'] === 'teacher'))
        );

        this.students$ = collectionData(collection(this.firestore, 'users'), {
            idField: 'id',
        }).pipe(
            map(users => users.filter(user => user['role'] === 'student'))
        );

        this.courseForm = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required], teacherId: [''], studentIds: [[]]
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

        this.students$.subscribe(data => {
            this.cachedStudents = data;
        })
    }

    addStudent(studentId: string): void {
        const currentStudents = this.courseForm.get('studentIds')?.value || [];
        if (!currentStudents.includes(studentId)) {
            const updatedStudents = [...currentStudents, studentId];
            this.courseForm.get('studentIds')?.setValue(updatedStudents);
        }
    }

    removeStudent(studentId: string): void {
        const currentStudents = this.courseForm.get('studentIds')?.value;
        const updatedStudents = currentStudents.filter((id: string) => id !== studentId);
        this.courseForm.get('studentIds')?.setValue(updatedStudents);
    }

    onSubmit(): void {
        if (this.courseForm.invalid) return;

        let course: Course = {
            ...this.courseForm.value
        };

        if (this.isEditMode && this.courseId) {
            course = { ...course, id: this.courseId };
        }

        const studentIds = this.courseForm.value.studentIds || [];

        if (this.isEditMode) {
            this.store.dispatch(updateCourse({ course }));
        } else {
            this.store.dispatch(addCourse({ course }));
        }

        studentIds.forEach((studentId: string) => {
            const student = this.cachedStudents.find(s => s.id === studentId);
            if (student) {
                const studentRef = doc(this.firestore, `courses/${course.id}/students/${studentId}`);
                setDoc(studentRef, {
                    studentId,
                    email: student.email,
                    grade: null,
                    absences: 0
                }, { merge: true });
            }
        });


        this.router.navigate(['/admin-dashboard']);
    }

    onStudentSelect(event: Event):
        void {
        const target = event.target as HTMLSelectElement;
        const studentId = target.value;
        if (studentId) {
            this.addStudent(studentId);
            target.selectedIndex = 0;
        }

    }

    getStudentName(studentId: string): string {
        const student = this.cachedStudents.find(s => s.id === studentId);
        return student?.email || 'Student';
    }
}