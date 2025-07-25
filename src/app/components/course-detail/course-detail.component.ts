import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '../../course.model';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-detail.component.html',
})
export class CourseDetailComponent {
  @Input() course: Course | null = null;
}
