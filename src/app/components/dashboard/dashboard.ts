import { Component, OnInit } from '@angular/core';
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
export class DashboardComponent implements OnInit {
  totalTasks = 0;
  completedTasks = 0;

  constructor(
    private taskService: TaskService, 
    public authService: Auth, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks: Task[]) => {
      this.totalTasks = tasks.length;
      this.completedTasks = tasks.filter((t: Task) => t.completed).length;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}