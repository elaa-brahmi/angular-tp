import { Injectable, signal } from '@angular/core';
import { Project } from '../../features/projects/models/project.model';

@Injectable({
  providedIn: 'root'
})
export class RecentProjectsService {
  private recentList = signal<Project[]>([]);

  recentProjects = this.recentList.asReadonly();

  addProject(project: Project) {
    this.recentList.update(projects => {
      const filtered = projects.filter(p => p.id !== project.id);

      return [project, ...filtered].slice(0, 5);
    });
  }
}
