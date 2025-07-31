import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

interface QuestionDB{
  options:string[],
  correctAnswer:string,
  questionText:string
}

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent {
  constructor(private http:HttpClient,private route: ActivatedRoute,private router: Router){}
  assignmentId!: string;
  questions = [
    {
      question: 'What is the capital of France?',
      options: ['Berlin', 'Madrid', 'Paris', 'Lisbon'],
      correctAnswerIndex: 2,
    },

  ];
  ngOnInit(){

    this.assignmentId = this.route.snapshot.paramMap.get('id')!;
    console.log(this.assignmentId);

    const headers = new HttpHeaders({
          Authorization :`Bearer ${localStorage.getItem("token")}`
        });
        this.http.get<QuestionDB[]>(`api/assessments/questions/${this.assignmentId}`, { headers } )
        .subscribe({
          next:(data) =>{
            console.log(data);
            data.forEach((d)=>{
              this.questions.push({
                question:  d.questionText,
                options: d.options,
                correctAnswerIndex: d.options.indexOf(d.correctAnswer),
              })
              console.log(d.questionText)
            })
          },
          error:(error)=>{
            console.log(error)
          }
    
        })
     
     
    
  }
  // Array of questions with options and correct answer index
   

  currentQuestionIndex = 0;
  score = 0;
  selectedOption: number | null = null;
  isAnswered = false;

  // Method to check if the answer is correct
  checkAnswer(optionIndex: number) {
    if (this.isAnswered) return; // Prevent changing after answering

    this.selectedOption = optionIndex;
    const isCorrect = optionIndex === this.questions[this.currentQuestionIndex].correctAnswerIndex;
    if (isCorrect) {
      this.score++;
    }
    this.isAnswered = true;
  }

  // Move to the next question
  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.isAnswered = false;
      this.selectedOption = null;
    }
  }

  // Restart the quiz
  restartQuiz() {
    this.currentQuestionIndex = 0;
     
    this.isAnswered = false;
    this.selectedOption = null;
    window.alert("Assessment Completed");
    const headers = new HttpHeaders({
      Authorization :`Bearer ${localStorage.getItem("token")}`
    });
    var per=Math.round((this.score / this.questions.length) * 100);
    this.http.post(`api/submissions/submit/${localStorage.getItem("id")}/${this.assignmentId}/${per}`,{},{headers})
    .subscribe({
      next:(data)=>{
        console.log(data)
        this.router.navigate(['/home/submissions'])
      }
    })
    
  }

  // Get current question
  get currentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }
  get percentage(): number {
    return Math.round((this.score / this.questions.length) * 100);
  }
  
}
