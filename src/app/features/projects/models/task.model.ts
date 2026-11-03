export type Priority = 'Haute' | 'Moyenne' | 'Basse';
export type TaskStatus = 'En attente' | 'En cours' | 'Terminé';

export interface Task {
  id: number;
  title: string;
  priority: Priority;
  status: TaskStatus;
  assigneeId?: number; // Partie 14
}
