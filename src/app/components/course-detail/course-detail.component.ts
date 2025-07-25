import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { Course } from '../../course.model';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [NgIf],
  templateUrl: './course-detail.component.html',
})
export class CourseDetailComponent {
  @Input() course: Course | null = null;
}
