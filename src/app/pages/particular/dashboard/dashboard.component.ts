import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {UserService} from "../../../core/service/user.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
constructor(public userService: UserService) {}
  OnLougout(){
    this.userService.logout();
  }
}
