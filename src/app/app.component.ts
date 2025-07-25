import { Component } from '@angular/core';
import { Course } from './course.model';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs';

interface Enrolls {
  course: {
    courseId: number,
    title: string,
    description: string,
    contentUrl: string
  },
  enrollmentId: number,
  progress: number
}

interface Assements{
  assessmentId: number;
    type: string;
    maxScore: number;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CourseListComponent, CourseDetailComponent, HttpClientModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  selectedCourse: Course | null = null;
  courses?: Course[];
  enrolls?: Enrolls[];
  assignments?:Assements[];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const headers = new HttpHeaders({
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjaGFyYW4xMjNAZ21haWwuY29tIiwicm9sZSI6IlNUVURFTlQiLCJpYXQiOjE3NTM0MjAzMzMsImV4cCI6MTc1MzUwNjczM30.TbRcDPDCYwRWBhLkCjR2m5EM9DpJufL4LmdFITGgknY`,
    });

    const enrollments$ = this.http.get<Enrolls[]>(`/student/enrollments/by-student/1`, { headers });
    const assessments$ = this.http.get<Assements[]>(`/api/assessments/by-course/1`, { headers });

    forkJoin([enrollments$, assessments$]).subscribe({
      next: ([enrollsData, assessmentsData]) => {
        this.enrolls = enrollsData;
        this.assignments=assessmentsData;
        

        // ✅ Now execute whatever logic you want *after both are fetched*
        this.handleAfterHttpComplete();
      },
      error: (err) => {
        console.error("  Error in one of the requests:", err);
      }
    });
  }

  handleAfterHttpComplete() {
    console.log(this.assignments);
    console.log(this.enrolls)
    this.courses=[]
    

    this.enrolls?.forEach((data)=>{
        this.courses!.push({...(data.course),
          progress:data.progress,
          assignments:[]})
    })

    console.log(this.courses)


  }

  onCourseSelected(course: Course) {
    this.selectedCourse = course;
  }
}
