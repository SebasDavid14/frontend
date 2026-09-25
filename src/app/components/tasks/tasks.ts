import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TaskService, Task } from '../../services/task';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css'
})
export class Tasks implements OnInit {

  newTask: Task = {
    title: '',
    description: '',
    completed: false
  };

  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data: Task[]) => {
        this.tasks = data;
      },
      error: (err: any) => {
        console.error('Error al obtener la lista de tareas:', err);
      }
    });
  }

  add(): void {
    if (!this.newTask.title.trim()) {
      alert('Ingresa el título de la tarea.');
      return;
    }

    this.taskService.addTask(this.newTask).subscribe({
      next: (res: Task) => {
        // Limpiamos los campos del formulario
        this.newTask = { title: '', description: '', completed: false };
        // Refrescamos la tabla
        this.loadTasks();
      },
      error: (err: any) => {
        console.error('Error al guardar la tarea:', err);
      }
    });
  }

  toggle(task: Task): void {
    if (!task.id) return;
    const updatedTask: Task = { ...task, completed: !task.completed };
    this.taskService.updateTask(task.id, updatedTask).subscribe({
      next: () => this.loadTasks(),
      error: (err: any) => console.error('Error al actualizar tarea:', err)
    });
  }

  delete(id: number | undefined): void {
    if (!id) return;
    if (confirm('¿Deseas eliminar esta tarea?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => this.loadTasks(),
        error: (err: any) => console.error('Error al eliminar tarea:', err)
      });
    }
  }
}