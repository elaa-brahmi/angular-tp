import { Component, computed, input } from '@angular/core';
import { User } from '../../models/user.model';
import { Project } from '../../../projects/models/project.model';
import { Task } from '../../../projects/models/task.model';
import { UserProjectGroupComponent } from '../user-project-group/user-project-group.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';

interface GroupedTasks {
  projectName: string;
  tasks: Task[];
}

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [UserProjectGroupComponent, EmptyStateComponent],
  template: `
    <div class="bg-white rounded-xl shadow-md border border-gray-100 p-6">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="text-lg font-bold text-gray-800">{{ user().name }}</h3>
          <p class="text-xs text-gray-500">{{ user().email }} • <span class="font-medium text-gray-700">{{ user().role }}</span></p>
        </div>
        <span [class]="user().active ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'"
              class="text-xs px-2.5 py-1 rounded-full font-semibold">
          {{ user().active ? 'Actif' : 'Inactif' }}
        </span>
      </div>

      <div class="grid grid-cols-3 gap-2 mb-4 text-center">
        <div class="bg-slate-50 p-2 rounded">
          <p class="text-xs text-gray-500">À faire</p>
          <p class="text-lg font-bold text-slate-700">{{ stats().todo }}</p>
        </div>
        <div class="bg-amber-50 p-2 rounded">
          <p class="text-xs text-amber-600">En cours</p>
          <p class="text-lg font-bold text-amber-700">{{ stats().inProgress }}</p>
        </div>
        <div class="bg-emerald-50 p-2 rounded">
          <p class="text-xs text-emerald-600">Terminées</p>
          <p class="text-lg font-bold text-emerald-700">{{ stats().done }}</p>
        </div>
      </div>

      <div class="space-y-3">
        @if (userGroups().length === 0) {
          <app-empty-state message="Aucune tâche assignée" />
        } @else {
          @for (group of userGroups(); track group.projectName) {
            <app-user-project-group [projectName]="group.projectName" [tasks]="group.tasks"></app-user-project-group>
          }
        }
      </div>
    </div>
  `
})
export class UserCardComponent {
  user = input.required<User>();
  projects = input.required<Project[]>();

  userGroups = computed(() => {
    const groups: GroupedTasks[] = [];
    const userId = this.user().id;

    for (const project of this.projects()) {
      const userTasks = (project.tasks ?? []).filter(t => t.assigneeId === userId);
      if (userTasks.length > 0) {
        groups.push({
          projectName: project.name,
          tasks: userTasks
        });
      }
    }
    return groups;
  });

  stats = computed(() => {
    let todo = 0, inProgress = 0, done = 0;
    this.userGroups().forEach(g => {
      g.tasks.forEach(t => {
        if (t.status === 'En attente') todo++;
        else if (t.status === 'En cours') inProgress++;
        else if (t.status === 'Terminé') done++;
      });
    });
    return { todo, inProgress, done };
  });
}
