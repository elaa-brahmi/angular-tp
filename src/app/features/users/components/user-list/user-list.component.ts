import { Component, computed, inject, signal, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.model';
import { Project } from '../../../projects/models/project.model';
import { UserService } from '../../../../core/services/user.service';
import { ProjectService } from '../../../../core/services/project.service';
import { UserCardComponent } from '../user-card/user-card.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [FormsModule, UserCardComponent, EmptyStateComponent],
  template: `
    <div class="space-y-6">
      <input
        type="text"
        [ngModel]="searchTerm()"
        (ngModelChange)="searchTerm.set($event)"
        placeholder="Rechercher un utilisateur..."
        class="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
      />

      @if (userService.isLoading()) {
        <app-empty-state message="Chargement des utilisateurs..." />
      } @else if (userService.errorMessage()) {
        <app-empty-state [message]="userService.errorMessage()!" />
      } @else if (filteredUsers().length === 0) {
        <app-empty-state message="Aucun utilisateur ne correspond à votre recherche." />
      } @else {
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          @for (user of filteredUsers(); track user.id) {
            <app-user-card [user]="user" [projects]="projects()"></app-user-card>
          }
        </div>
      }
    </div>
  `
})
export class UserListComponent implements OnInit {
  userService = inject(UserService);
  private projectService = inject(ProjectService);
  private platformId = inject(PLATFORM_ID);

  users = signal<User[]>([]);
  projects = signal<Project[]>([]);
  searchTerm = signal<string>('');

  filteredUsers = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.users().filter(u =>
      (u.name ?? '').toLowerCase().includes(term) ||
      (u.email ?? '').toLowerCase().includes(term) ||
      (u.role ?? '').toLowerCase().includes(term)
    );
  });

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.userService.getUsers().subscribe(users => this.users.set(users));
    this.projectService.getProjects().subscribe(projects => this.projects.set(projects));
  }
}
