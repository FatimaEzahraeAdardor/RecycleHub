import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from "../../../model/user";
import { UserService } from "../../../core/service/user.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { Observable } from "rxjs";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId: string | null = null;
  user: User | undefined;
  isEditModalOpen = false;
  editForm: FormGroup;
  errorMessage: string = '';
  isModalOpen = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      birthDate: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]], // Format YYYY-MM-DD
      profilePicture: ['']
    });
  }

  async ngOnInit(): Promise<void> {
    const storedUser = localStorage.getItem('currentUser');
    this.userId = storedUser ? JSON.parse(storedUser).id : this.route.snapshot.paramMap.get('id');

    if (!this.userId) {
      console.error("No user ID found");
      return;
    }

    try {
      this.user = await this.getUserById(this.userId).toPromise();
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  getUserById(userId: string): Observable<User> {
    return this.userService.getUserById(userId);
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.editForm.patchValue({ profilePicture: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  }
  updateUser(): void {
    if (this.editForm.invalid) {
      return;
    }

    const updatedUser: User = {
      ...this.user, // Keep existing properties
      ...this.editForm.value // Override with form values
    };

    this.userService.updateUser(updatedUser).subscribe({
      next: (response) => {
        console.log('User updated successfully:', response);
        this.user = response;
        this.closeModal();
      },
      error: (error) => {
        console.error('Error updating user:', error);
      }
    });
  }

}
