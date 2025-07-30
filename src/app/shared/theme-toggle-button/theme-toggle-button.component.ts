import { NgClass } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ThemeService } from '@services/theme.service';

@Component({
  selector: 'app-theme-toggle-button',
  imports: [NgClass],
  templateUrl: './theme-toggle-button.component.html',
})
export class ThemeToggleButtonComponent {
  private themeService = inject(ThemeService);

  public isDarkMode = computed<boolean>(
    () => this.themeService.theme().darkMode
  );

  public toggleTheme(): void {
    this.themeService.theme.update((current) => ({
      ...current,
      darkMode: !current.darkMode,
    }));
  }
}
