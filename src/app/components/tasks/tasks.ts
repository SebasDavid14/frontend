import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TaskService, Tarea } from '../../services/task';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css'
})
export class Tasks implements OnInit {

  nuevaTarea: Tarea = {
    titulo: '',
    descripcion: '',
    completado: false
  };

  tareas: Tarea[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.cargarTareas();
  }

  cargarTareas(): void {
    this.taskService.getTareas().subscribe({
      next: (data: Tarea[]) => {
        this.tareas = data;
      },
      error: (err: any) => {
        console.error('Error al obtener la lista de tareas:', err);
      }
    });
  }

  add(): void {
    if (!this.nuevaTarea.titulo.trim()) {
      alert('Por favor, ingresa un título');
      return;
    }

    this.taskService.crearTarea(this.nuevaTarea).subscribe({
      next: (res: Tarea) => {
        console.log('Tarea guardada exitosamente:', res);
        this.nuevaTarea = { titulo: '', descripcion: '', completado: false };
        this.cargarTareas();
      },
      error: (err: any) => {
        console.error('Error al guardar la tarea:', err);
      }
    });
  }

  toggle(tarea: Tarea): void {
    if (!tarea.id) return;
    
    const tareaActualizada: Tarea = { ...tarea, completado: !tarea.completado };
    this.taskService.actualizarTarea(tarea.id, tareaActualizada).subscribe({
      next: () => this.cargarTareas(),
      error: (err: any) => console.error('Error al actualizar tarea:', err)
    });
  }

  delete(id: number | undefined): void {
    if (!id) return;

    if (confirm('¿Estás seguro de eliminar esta tarea?')) {
      this.taskService.eliminarTarea(id).subscribe({
        next: () => this.cargarTareas(),
        error: (err: any) => console.error('Error al eliminar tarea:', err)
      });
    }
  }
}