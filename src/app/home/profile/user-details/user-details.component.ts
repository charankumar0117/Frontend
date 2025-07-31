import { Component, Input } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
@Component({
  selector: 'app-profiles',
  standalone: true,
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
  @Input() name: string = 'John Doe';
  @Input() email: string = 'john.doe@example.com';
  @Input() role?: string;
}

