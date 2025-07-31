import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
 
import { AssignmentListComponent } from '../assignment-list/assignment-list.component';
import { Course } from '../../../course.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule,AssignmentListComponent],
  templateUrl: './course-details.component.html',
})
export class CourseDetailComponent {
  @Input() course: Course | null = null;

  constructor(private http:HttpClient){}
  onClickOfUrl(course:Course){
     
    var progress=course.progress
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`, // You can externalize this token later
    });


    this.http.put(`/student/enrollments/${course.eid}/progress/${course.progress+25}`,{},{headers})
    .subscribe({
      next:(data)=>{
        console.log(data)
      }
    })

  }
}
