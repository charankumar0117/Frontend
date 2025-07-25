import { Component } from '@angular/core';
import { Course } from './course.model';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

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
  selector: 'app-root',
  standalone: true,
  imports: [CourseListComponent, CourseDetailComponent,HttpClientModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private http: HttpClient) {}
   
  selectedCourse: Course | null = null;

  onCourseSelected(course: Course) {
    this.selectedCourse = course;
  }
  listOfCourses?:Enrolls[];
  courses?:Course[];
  ngOnInit() {
    const headers = new HttpHeaders({
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjaGFyYW4xMjNAZ21haWwuY29tIiwicm9sZSI6IlNUVURFTlQiLCJpYXQiOjE3NTM0MTg5MjQsImV4cCI6MTc1MzUwNTMyNH0.rS2ySAOr5vjzeMuO1-MPyhAcXBbCGLACgvGVv6eaDXI`,
    });
    console.log(localStorage.getItem('id'));

    this.http
      .get<Enrolls[]>(`/student/enrollments/by-student/1`, { headers }) // <-- add headers here
      .subscribe({
        next: (data) => {
          console.log(data);
          this.listOfCourses=data
        },
        error: (err) => {
          console.error('Error fetching courses:', err);
        },
      });

}
}
