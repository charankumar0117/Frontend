import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddQuizComponent } from '../add-quiz/add-quiz.component';
import { AssignmentListComponent } from '../assignment-list/assignment-list.component';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}
interface Options{
  optionText:string;
}
interface Questions{
  
    questionText: string,
    correctAnswer: string,
    options: Options[]
  
}
@Component({
  selector: 'app-add-assignment',
  standalone: true,
  imports: [HttpClientModule,CommonModule, FormsModule, AddQuizComponent, AssignmentListComponent],
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent {

  constructor(private http:HttpClient){}
  @Input() courseId!: number;

  maxScore = 0;
  showQuizPopup = false;

  openQuizPopup() {
    this.showQuizPopup = true;
  }

  closeQuizPopup() {
    this.showQuizPopup = false;
  }

  submitAssignment() {
    const payload = {
      maxScore: this.maxScore,
      type: 'Assignment',
      courseId: this.courseId
    };

    console.log('Submitting:', payload);
    // send payload to backend
  }
  getQuiz(quizDetails :QuizQuestion[]){
    //console.log(quizDetails)

    let assignment:Questions[]=[] ;
    quizDetails.forEach((data)=>{
      let temp:Options[]=[];
      data.options.forEach((op)=>{
        temp.push({
          optionText:op
        })
      })
       
      
      assignment.push({
        questionText: data.question,
        correctAnswer: data.correctAnswer,
        options: temp
      })
      
    })
    console.log(assignment)


    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    });
 
    this.http.post(`api/assessments/add/${this.courseId}/${localStorage.getItem("id")}`,{
          maxScore: this.maxScore,
          questions:assignment


    }, { headers })
    .subscribe({
      next: (data) =>  console.log(data),
      error: (err) => console.error('Error loading courses', err),
    });

  }
}
