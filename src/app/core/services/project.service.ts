import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, finalize, of, timeout } from 'rxjs';
import { Project } from '../../features/projects/models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/projects';

  private serviceId = Math.random();

  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);

  constructor() {
    console.log(`[ProjectService] Instance créée avec l'id : ${this.serviceId}`);
  }

  getProjects(): Observable<Project[]> {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    return this.http.get<Project[]>(this.apiUrl).pipe(
      timeout(8000),
      catchError(err => {
        this.errorMessage.set(
          'Impossible de charger les projets. Vérifiez que l\'API tourne (`npm run api`). ' +
          (err.message ?? '')
        );
        return of([]);
      }),
      finalize(() => this.isLoading.set(false))
    );
  }
}
