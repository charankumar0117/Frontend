import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Assignment } from '../../course.model';

@Component({
  selector: 'app-assignment-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assignment-list.component.html',
})
export class AssignmentListComponent implements OnChanges {
  @Input() courseId!: number;

  assignments: Assignment[] = [];

  constructor(private http: HttpClient) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['courseId'] && this.courseId) {
      this.fetchAssignments();
    }
  }

  fetchAssignments() {
    const headers = new HttpHeaders({
      Authorization: `Bearer  eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjaGFyYW4xMjNAZ21haWwuY29tIiwicm9sZSI6IlNUVURFTlQiLCJpYXQiOjE3NTM0MjAzMzMsImV4cCI6MTc1MzUwNjczM30.TbRcDPDCYwRWBhLkCjR2m5EM9DpJufL4LmdFITGgknY`, // You can externalize this token later
    });

    this.http.get<Assignment[]>(`/api/assessments/by-course/${this.courseId}`, { headers })
      .subscribe({
        next: (data) => {
          this.assignments = data;
        },
        error: (err) => {
          console.error('Error fetching assignments:', err);
        }
      });
  }
}
