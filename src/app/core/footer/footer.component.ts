import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/interfaces/user.interface';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {

  userRol?: string;

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.loadUserData();
  }

  private loadUserData(): void {
    const user = this.userService.getCookie('user');
    if (user) {
      this.userRol = user.userType; 
    }
  }

}
