import { Component, input, output } from '@angular/core';

export type ViewMode = 'tasks' | 'users';

@Component({
  selector: 'app-view-toggle',
  standalone: true,
  template: `
    <div class="inline-flex rounded-lg border border-gray-200 bg-gray-100 p-1">
      <button
        (click)="modeChange.emit('tasks')"
        [class]="currentMode() === 'tasks' ? 'bg-white shadow text-indigo-600 font-semibold' : 'text-gray-600 hover:text-gray-900'"
        class="px-4 py-2 text-sm rounded-md transition-colors">
        Par tâche
      </button>
      <button
        (click)="modeChange.emit('users')"
        [class]="currentMode() === 'users' ? 'bg-white shadow text-indigo-600 font-semibold' : 'text-gray-600 hover:text-gray-900'"
        class="px-4 py-2 text-sm rounded-md transition-colors">
        Par user
      </button>
    </div>
  `
})
export class ViewToggleComponent {
  currentMode = input.required<ViewMode>();
  modeChange = output<ViewMode>();
}
