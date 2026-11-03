import { Component, inject, signal } from '@angular/core';
import { ViewToggleComponent, ViewMode } from './shared/components/view-toggle/view-toggle.component';
import { ProjectListComponent } from './features/projects/components/project-list/project-list.component';
import { UserListComponent } from './features/users/components/user-list/user-list.component';
import { FavoritesService } from './core/services/favorites.service';
import { RecentProjectsService } from './core/services/recent-projects.service'; // 1. Importer
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ViewToggleComponent, ProjectListComponent, UserListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  currentView = signal<ViewMode>('tasks');

  favoritesService = inject(FavoritesService);
  recentProjectsService = inject(RecentProjectsService);
  themeService = inject(ThemeService);

  onViewChange(mode: ViewMode): void {
    this.currentView.set(mode);
  }
}
