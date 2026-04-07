import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { User } from '../../models/measurement.models';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './auth.html',
  styleUrls: ['./auth.css']
})
export class AuthComponent {

  private auth = inject(AuthService);
  private router = inject(Router);

  isLogin: boolean = true;

  username: string = '';
  password: string = '';

  // ✅ LOGIN
  handleLogin() {
    const payload: User = {
      username: this.username,
      password: this.password
    };

    this.auth.login(payload).subscribe({
      next: (res) => {
        console.log("Login success:", res);

        // ✅ store username for later use
        localStorage.setItem('username', this.username);

        // ✅ navigate to home
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error("Login failed:", err);
        alert("Invalid credentials");
      }
    });
  }

  // ✅ SIGNUP
  handleSignup() {
    const payload: User = {
      username: this.username,
      password: this.password
    };

    this.auth.signup(payload).subscribe({
      next: (res) => {
        console.log("Signup success:", res);

        alert("Signup successful! Please login.");

        // switch to login tab
        this.isLogin = true;

        // clear fields
        this.username = '';
        this.password = '';
      },
      error: (err) => {
        console.error("Signup failed:", err);
        alert("Signup failed");
      }
    });
  }
}