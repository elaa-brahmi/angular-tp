import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);

  isDarkMode = signal<boolean>(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode.set(localStorage.getItem('theme') === 'dark');
    }

    effect(() => {
      const isDark = this.isDarkMode();
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }

      localStorage.setItem('theme', isDark ? 'dark' : 'light');

      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    });
  }

  toggleTheme() {
    this.isDarkMode.update(dark => !dark);
  }
}
