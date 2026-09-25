import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

  constructor(
    private taskService: TaskService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data: Task[]) => {
        this.tasks = data;
        this.cd.detectChanges(); // Forzamos la actualización gráfica
      },
      error: (err: any) => {
        console.error('Error al obtener la lista de tareas:', err);
      }
    });
  }

  add(event?: Event): void {
    if (event) {
      event.preventDefault(); // CANCELA LA RECARGA DE LA PÁGINA (Evita el 404)
    }

    if (!this.newTask.title || !this.newTask.title.trim()) {
      alert('Ingresa el título de la tarea.');
      return;
    }

    this.taskService.addTask(this.newTask).subscribe({
      next: (createdTask: Task) => {
        // 1. Agregamos la tarea recibida de la BD al arreglo local
        this.tasks = [...this.tasks, createdTask];

        // 2. Limpiamos los inputs del formulario
        this.newTask = { title: '', description: '', completed: false };

        // 3. Forzamos a Angular a renderizar la nueva fila de inmediato
        this.cd.detectChanges();
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
      next: (res: Task) => {
        this.tasks = this.tasks.map(t => t.id === res.id ? res : t);
        this.cd.detectChanges();
      },
      error: (err: any) => console.error('Error al actualizar tarea:', err)
    });
  }

  delete(id: number | undefined): void {
    if (!id) return;
    if (confirm('¿Deseas eliminar esta tarea?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(t => t.id !== id);
          this.cd.detectChanges();
        },
        error: (err: any) => console.error('Error al eliminar tarea:', err)
      });
    }
  }
}