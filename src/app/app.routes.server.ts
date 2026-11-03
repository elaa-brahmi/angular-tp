import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    // Client render: json-server is not available during SSR/prerender,
    // and pending HTTP calls would keep the page spinning forever.
    renderMode: RenderMode.Client
  }
];
