import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TaskService ,Task } from '../../services/task';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './tasks.html'
})
export class Tasks implements OnInit {
  tasks: Task[] = [];
  newTask: Task = { title: '', description: '', completed: false };

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(data => this.tasks = data);
  }

  add(): void {
    if (!this.newTask.title) return;
    this.taskService.createTask(this.newTask).subscribe(() => {
      this.newTask = { title: '', description: '', completed: false };
      this.loadTasks();
    });
  }

  toggle(task: Task): void {
    if (!task.id) return;
    task.completed = !task.completed;
    this.taskService.updateTask(task.id, task).subscribe(() => this.loadTasks());
  }

  delete(id?: number): void {
    if (!id) return;
    this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
  }
}