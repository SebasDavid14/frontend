import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html'
})
export class RegisterComponent {
  userData = { username: '', password: '' };
  message = '';

  constructor(private authService: Auth, private router: Router) {}

  onRegister(): void {
    this.authService.register(this.userData).subscribe({
      next: (res) => {
        this.message = 'Registro exitoso. Redirigiendo...';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.message = 'Error en el registro.';
      }
    });
  }
}