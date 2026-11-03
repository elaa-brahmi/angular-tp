import { Component, input, output, inject } from '@angular/core';
import { Project } from '../../models/project.model';
import { TaskListComponent } from '../task-list/task-list.component';
import { User } from '../../../users/models/user.model';
import { FavoritesService } from '../../../../core/services/favorites.service';
import { RecentProjectsService } from '../../../../core/services/recent-projects.service'; // 1. Importer le service

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [TaskListComponent],
  template: `
    <div class="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col justify-between h-full">
      <div>
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-xl font-bold text-gray-800">{{ project().name }}</h3>

          <div class="flex items-center gap-2">
            <button
              (click)="favoritesService.toggle(project().id.toString())"
              class="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-sm focus:outline-none"
              title="Gérer les favoris">
              @if (favoritesService.isFavorite(project().id.toString())) {
                <span>★</span>
              } @else {
                <span>☆</span>
              }
            </button>

            <span [class]="getStatusBadge(project().status)" class="text-xs px-2.5 py-1 rounded-full font-semibold">
              {{ project().status }}
            </span>
          </div>
        </div>

        <p class="text-gray-600 text-sm mb-4">{{ project().description }}</p>

        <div class="mb-4">
          <h4 class="text-sm font-semibold text-gray-700 mb-2">Tâches ({{ project().tasks?.length || 0 }})</h4>
          <app-task-list [tasks]="project().tasks || []" [users]="users()"></app-task-list>
        </div>
      </div>

      <button
        (click)="selectProcess()"
        class="w-full mt-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-medium py-2 rounded-lg transition-colors text-sm">
        Sélectionner le projet
      </button>
    </div>
  `
})
export class ProjectCardComponent {
  project = input.required<Project>();
  users = input<User[]>([]);
  projectSelected = output<Project>();

  favoritesService = inject(FavoritesService);
  recentProjectsService = inject(RecentProjectsService);
  selectProcess(): void {
    // 3. Ajouter aux projets récents à l'ouverture/sélection
    this.recentProjectsService.addProject(this.project());

    this.projectSelected.emit(this.project());
  }

  getStatusBadge(status: string): string {
    switch (status) {
      case 'Terminé': return 'bg-emerald-100 text-emerald-800';
      case 'En cours': return 'bg-blue-100 text-blue-800';
      default: return 'bg-amber-100 text-amber-800';
    }
  }
}
