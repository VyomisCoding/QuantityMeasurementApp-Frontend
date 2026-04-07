import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar {

  private router = inject(Router);

  username = localStorage.getItem('username') || 'Guest';

  showDropdown = false;

  // Toggle dropdown
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onClickOutside(event: any) {
    if (!event.target.closest('.user-box')) {
      this.showDropdown = false;
    }
  }

  // Logout logic
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');

    this.showDropdown = false;

    this.router.navigate(['/']); // redirect to login/home
  }
}