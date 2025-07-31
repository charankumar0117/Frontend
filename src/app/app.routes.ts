import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home/home.component';
import { SampleComponent } from './home/sample/sample.component';
import { CoursesComponent } from './home/courses/courses.component';
import { EnrollsComponent } from './home/enrolls/enrolls.component';
import { ProfileComponent } from './home/profile/profile.component';
import { SubmissionsComponent } from './home/submissions/submissions.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AdminCourseComponent } from './home/admin-course/admin-course.component';
export const routes: Routes = [
    {path:'' ,component:WelcomeComponent},
    {path:'forgotPassword',component:ForgotPasswordComponent},
    { path: 'register', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    {path:'assesment/:id',component:AssessmentComponent},
     
    {   path:'home',
        component:HomeComponent,
        children:[
            {
                path:'courseByAdmin',
                component:AdminCourseComponent,
            },
            {
            path:'',
            component:SampleComponent
            },{
                path:'courses',
                component:CoursesComponent
            },{
                path:'enrolls',
                component:EnrollsComponent
            },{
                path:'profile',
                component:ProfileComponent
            },{
                path:'submissions',
                component:SubmissionsComponent
            }
    ]
    }
    ];