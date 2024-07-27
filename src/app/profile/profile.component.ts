import { Component,Input } from '@angular/core';
import { userProfileDetails } from '../userProfileDetails';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  @Input() user: userProfileDetails | null = null;

}
