import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from "../../../model/user";
import { UserService } from "../../../core/service/user.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId: string | null = null;
  user: User | undefined;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('currentUser');
    this.userId = storedUser ? JSON.parse(storedUser).id : null;

    if (!this.userId) {
      this.userId = this.route.snapshot.paramMap.get('id');
    }

    if (this.userId) {
      this.getUserById(this.userId).subscribe(user => {
        this.user = user;
      }, error => {
        console.error("Error fetching user:", error);
      });
    } else {
      console.error("No user ID found");
    }
  }

  getUserById(userId: string): Observable<User> {
    return this.userService.getUserById(userId);
  }
}
