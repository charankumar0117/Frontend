import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '../../course.model';
import { AssignmentListComponent } from '../assignment-list/assignment-list.component';
@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule,AssignmentListComponent],
  templateUrl: './course-detail.component.html',
})
export class CourseDetailComponent {
  @Input() course: Course | null = null;
}
