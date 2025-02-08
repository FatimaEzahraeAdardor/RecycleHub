import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {Router, RouterLink, RouterModule} from "@angular/router";
import {UserService} from "../../../core/service/user.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    RouterModule,
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
