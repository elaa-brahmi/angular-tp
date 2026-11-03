import { Component, computed, inject, signal, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Project } from '../../models/project.model';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { ProjectService } from '../../../../core/services/project.service';
import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../users/models/user.model';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [FormsModule, ProjectCardComponent, EmptyStateComponent],
  template: `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <input
          type="text"
          [ngModel]="searchTerm()"
          (ngModelChange)="searchTerm.set($event)"
          placeholder="Rechercher un projet..."
          class="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      @if (projectService.isLoading()) {
        <app-empty-state message="Chargement des projets..." />
      } @else if (projectService.errorMessage()) {
        <app-empty-state [message]="projectService.errorMessage()!" />
      } @else if (filteredProjects().length === 0) {
        <app-empty-state message="Aucun projet ne correspond à votre recherche." />
      } @else {
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          @for (project of filteredProjects(); track project.id) {
            <app-project-card
              [project]="project"
              [users]="users()"
              (projectSelected)="onProjectSelected($event)">
            </app-project-card>
          }
        </div>
      }
    </div>
  `
})
export class ProjectListComponent implements OnInit {
  projectService = inject(ProjectService);
  private userService = inject(UserService);
  private platformId = inject(PLATFORM_ID);

  projects = signal<Project[]>([]);
  users = signal<User[]>([]);
  searchTerm = signal<string>('');

  filteredProjects = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.projects().filter(p =>
      (p.name ?? '').toLowerCase().includes(term) ||
      (p.description ?? '').toLowerCase().includes(term)
    );
  });

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.projectService.getProjects().subscribe(projects => this.projects.set(projects));
    this.userService.getUsers().subscribe(users => this.users.set(users));
  }

  onProjectSelected(project: Project): void {
    console.log('Projet sélectionné :', project);
  }
}
