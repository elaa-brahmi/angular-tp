import { Component, input } from '@angular/core';
import { Task } from '../../../projects/models/task.model';
import { TaskListComponent } from '../../../projects/components/task-list/task-list.component';

@Component({
  selector: 'app-user-project-group',
  standalone: true,
  imports: [TaskListComponent],
  template: `
    <div class="border border-gray-200 rounded-lg p-3 bg-gray-50/50">
      <div class="flex items-center justify-between mb-2">
        <span class="font-semibold text-sm text-indigo-900">{{ projectName() }}</span>
        <span class="text-xs bg-indigo-100 text-indigo-700 font-bold px-2 py-0.5 rounded-full">
          {{ tasks().length }} task(s)
        </span>
      </div>
      <app-task-list [tasks]="tasks()" [showAssignee]="false"></app-task-list>
    </div>
  `
})
export class UserProjectGroupComponent {
  projectName = input.required<string>();
  tasks = input.required<Task[]>();
}
