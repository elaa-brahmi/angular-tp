import { Component, input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  template: `
    <div class="p-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-300">
      <p class="text-gray-500 font-medium">{{ message() }}</p>
    </div>
  `
})
export class EmptyStateComponent {
  message = input<string>('Aucun élément à afficher.');
}
