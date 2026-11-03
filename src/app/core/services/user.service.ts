import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, finalize, of, timeout } from 'rxjs';
import { User } from '../../features/users/models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/users';

  private serviceId = Math.random();

  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);

  constructor() {
    console.log(`[UserService] Instance créée avec l'id : ${this.serviceId}`);
  }

  getUsers(): Observable<User[]> {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    return this.http.get<User[]>(this.apiUrl).pipe(
      timeout(8000),
      catchError(err => {
        this.errorMessage.set(
          'Impossible de charger les utilisateurs. Vérifiez que l\'API tourne (`npm run api`). ' +
          (err.message ?? '')
        );
        return of([]);
      }),
      finalize(() => this.isLoading.set(false))
    );
  }

  getUserById(id: number): Observable<User | null> {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(
      timeout(8000),
      catchError(err => {
        this.errorMessage.set('Erreur lors de la récupération de l\'utilisateur : ' + err.message);
        return of(null);
      }),
      finalize(() => this.isLoading.set(false))
    );
  }
}
