import { Injectable, signal } from '@angular/core';

export interface ToastNotification {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSignal = signal<ToastNotification[]>([]);
  notifications = this.notificationsSignal.asReadonly();

  show(message: string, type: 'success' | 'error' | 'info' = 'info') {
    const id = Date.now();
    this.notificationsSignal.update(list => [...list, { id, message, type }]);

    setTimeout(() => {
      this.remove(id);
    }, 4000);
  }

  remove(id: number) {
    this.notificationsSignal.update(list => list.filter(n => n.id !== id));
  }
}
