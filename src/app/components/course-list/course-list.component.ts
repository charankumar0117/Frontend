import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../../course.model';
import { NgFor, SlicePipe } from '@angular/common';
interface Enrolls{
  
  course:{

    courseId:number,
    title:string,
    description:string,
    contentUrl:string
  } ,
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
  @Input() courses: Enrolls[] = [];
  @Output() selectCourse = new EventEmitter<Course>();

  onSelect(course: Enrolls) {
    this.selectCourse.emit(course.course);
  }
}
