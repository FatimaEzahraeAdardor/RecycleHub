import { Component } from '@angular/core';
import { NgIf, NgStyle } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { UserService } from "../../../core/service/user.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgStyle,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.userService.login(email, password).subscribe(user => {
        if (user) {
          alert('Login successful!');

          if (user.role === 'particulier') {
            this.router.navigate(['/dashboard']);
          } else if (user.role === 'collecteur') {
            this.router.navigate(['/dashboardCollector']);
          } else {
            this.errorMessage = 'Invalid email or password!';
          }
        }
      }, error => {
        this.errorMessage = 'Server error. Please try again later.';
      });
    } else {
      this.errorMessage = 'Please fill out all required fields correctly.';
    }
  }
}
