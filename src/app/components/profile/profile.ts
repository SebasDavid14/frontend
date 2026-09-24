import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile.html'
})
export class Profile implements OnInit {
  token: string | null = '';

  constructor(private authService: Auth) {}

  ngOnInit(): void {
    this.token = this.authService.getToken();
  }
}