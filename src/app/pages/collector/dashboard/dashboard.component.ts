import { Component } from '@angular/core';
import {UserService} from "../../../core/service/user.service";
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  userId: string | null = null;
  constructor(public userService: UserService) {
    const storedUser = localStorage.getItem('currentUser');
    this.userId = storedUser ? JSON.parse(storedUser).id : null;
  }
  OnLougout(){
    this.userService.logout();
  }
}
