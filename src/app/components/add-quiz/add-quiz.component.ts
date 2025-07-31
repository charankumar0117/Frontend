import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

@Component({
  selector: 'app-add-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css'],
})
export class AddQuizComponent {
  @Output() quizSubmit = new EventEmitter<QuizQuestion[]>();
  
  currentQuestion: QuizQuestion = {
    question: '',
    options: ['', '', '', ''],
    correctAnswer: ''
  };

  questions: QuizQuestion[] = [];

  addQuestion() {
    if (
      !this.currentQuestion.question.trim() ||
      this.currentQuestion.options.some(opt => !opt.trim()) ||
      !this.currentQuestion.correctAnswer.trim()
    ) {
      alert('Please fill in all fields.');
      return;
    }

    if (this.questions.length >= 10) {
      alert('Maximum 10 questions allowed.');
      return;
    }

    this.questions.push({ ...this.currentQuestion });
    this.currentQuestion = {
      question: '',
      options: ['', '', '', ''],
      correctAnswer: ''
    };
  }

  submitQuiz() {
    if (this.questions.length === 0) {
      alert('Please add at least one question.');
      return;
    }

    console.log('Quiz submitted:', this.questions);
    alert('Quiz submitted successfully!');
    this.quizSubmit.emit(this.questions); // Notify parent
  }
}
