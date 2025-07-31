import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
interface Data {
  contentUrl: string;
  courseId: number;
  description:  string;
  title: string;
}
@Component({
  selector: 'app-cards',
  imports: [RouterLink,HttpClientModule],
  templateUrl: './cards.component.html',
  styleUrls:['./cards.component.css']
})
export class CardsComponent {

  @Input() courseData!:Data;
  path=window.location.pathname
  role=localStorage.getItem("role")
  constructor(private http:HttpClient,private router:Router){}
  enroll(id:number){
    console.log("enroll is clicked")
    console.log(this.path)

    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    console.log(localStorage.getItem('id'));

    this.http
      .post(`/student/enrollments/enroll/${localStorage.getItem("id")}/${id}`,{}, { headers }) // <-- add headers here
      .subscribe({
        next: (data) => {
          console.log(data);
          window.alert("enrolled successfully")
         //this.listOfCourses=data;
        },
        error: (err) => {
          console.error(err.error.message);
          window.alert(err.error.message)
          
        },
      });
  }
  assessmentDetails( id:number){
    console.log(id)
    this.router.navigate(["/home/courseByAdmin/assign/",id])


  }

  

}
