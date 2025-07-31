import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [FormsModule,HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  role: 'STUDENT' | 'INSTRUCTOR' = 'STUDENT';

  constructor(private router: Router,private http:HttpClient
  ) {}

  signup() {
    console.log('Signup clicked with:', {
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role,
    });

    this.http.post<{message:string,status:string,token:string}>('api/auth/register',{
      email:this.email,
      password:this.password,
      role:this.role,
      name:this.name
  }).subscribe({
      
      next :(data)=>{
          console.log(data)
          localStorage.setItem("token",data.token)
          this.router.navigate(["/login"])
      },
      error:(error)=>{
        console.log(error.error.message)
        window.alert("email already register")
      }
  })
     
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
