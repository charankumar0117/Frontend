import { Component, Input, Output, EventEmitter } from '@angular/core';
 
import { NgFor, SlicePipe } from '@angular/common';
import { Course } from '../../../course.model';
interface Enrolls{
  
  course:Course ,
  enrollmentId:number,
  progress:number

}
@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [NgFor, SlicePipe],
  templateUrl: './course-list.component.html',
})
export class CourseListComponent {
  @Input() courses: Course[] = [];
  @Output() selectCourse = new EventEmitter<Course>();

  onSelect(course: Course) {
    this.selectCourse.emit(course);
  }
}
