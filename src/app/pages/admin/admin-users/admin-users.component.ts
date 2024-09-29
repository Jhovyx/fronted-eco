import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'admin-users',
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css',
 
})
export class AdminUsersComponent {
  users: any[] = [];

  constructor(private userService: UserService) { }

 

  goBack(): void {
    window.history.back();
  }
}