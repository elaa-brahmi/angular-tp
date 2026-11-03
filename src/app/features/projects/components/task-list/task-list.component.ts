import { Component, input } from '@angular/core';
import { Task } from '../../models/task.model';
import { User } from '../../../users/models/user.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  template: `
    @if (tasks().length === 0) {
      <p class="text-sm text-gray-400 italic">Aucune tâche.</p>
    } @else {
      <div class="space-y-2">
        @for (task of tasks(); track task.id) {
          <div [class]="getTaskBorderColor(task.status)"
               class="p-3 bg-gray-50 rounded border-l-4 shadow-sm flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-800">{{ task.title }}</p>
              @if (showAssignee() && task.assigneeId) {
                <span class="text-xs text-gray-500">
                  Assigné à : {{ getAssigneeName(task.assigneeId) }}
                </span>
              }
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-xs px-2 py-0.5 rounded font-medium" [class]="getPriorityClass(task.priority)">
                {{ task.priority }}
              </span>
              <span class="text-xs px-2 py-0.5 rounded font-semibold" [class]="getStatusClass(task.status)">
                {{ task.status }}
              </span>
            </div>
          </div>
        }
      </div>
    }
  `
})
export class TaskListComponent {
  tasks = input.required<Task[]>();
  users = input<User[]>([]);
  showAssignee = input<boolean>(true);

  getAssigneeName(id: number): string {
    const user = this.users().find(u => u.id === id);
    return user ? user.name : 'Inconnu';
  }

  getTaskBorderColor(status: string): string {
    switch (status) {
      case 'Terminé': return 'border-emerald-500';
      case 'En cours': return 'border-amber-500';
      default: return 'border-slate-300';
    }
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'Haute': return 'bg-red-100 text-red-700';
      case 'Moyenne': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Terminé': return 'bg-emerald-100 text-emerald-800';
      case 'En cours': return 'bg-amber-100 text-amber-800';
      default: return 'bg-slate-100 text-slate-700';
    }
  }
}
