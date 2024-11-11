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
    this.userService.user$.subscribe(user => {
      if(user){
        this.userRol = user?.userType; 
      }
    });
  }

  private loadUserData(): void {
    const data = sessionStorage.getItem('user');
    if (data) {
      const user: User = JSON.parse(data);
      this.userRol = user.userType; 
    }
  }

}
