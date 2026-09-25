import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TaskService, Task } from '../../services/task';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  totalTasks = 0;
  completedTasks = 0;

  constructor(
    private taskService: TaskService, 
    public authService: Auth, 
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadMetrics();
  }

  loadMetrics(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks: Task[]) => {
        this.totalTasks = tasks.length;
        this.completedTasks = tasks.filter((t: Task) => t.completed).length;
        this.cd.detectChanges(); // Forzamos a la plantilla a mostrar las métricas reales
      },
      error: (err) => console.error('Error al obtener métricas:', err)
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}