import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  credentials = { username: '', password: '' };
  errorMessage = '';

  constructor(private authService: Auth, private router: Router) {}

  onLogin(): void {
    this.authService.login(this.credentials).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token);
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.errorMessage = 'Credenciales inválidas o servidor desconectado.';
      }
    });
  }
}