import { Component, OnInit } from '@angular/core';
import { UserService } from './shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    const user = this.userService.getCookie('user');
    if(user?.userType === 'admin'){
      this.router.navigate(['/admin-viajes']);
    }
  }
}
