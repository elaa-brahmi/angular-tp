import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoritesIds = signal<string[]>([]);

  count = this.favoritesIds.asReadonly();

  isFavorite(projectId: string): boolean {
    return this.favoritesIds().includes(projectId);
  }

  toggle(projectId: string) {
    this.favoritesIds.update(ids => {
      if (ids.includes(projectId)) {
        return ids.filter(id => id !== projectId);
      } else {
        return [...ids, projectId];
      }
    });
  }
}
