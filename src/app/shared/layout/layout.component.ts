import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeConfiguratorButtonComponent } from '@shared/theme-configurator-button/theme-configurator-button.component';
import { ThemeToggleButtonComponent } from '@shared/theme-toggle-button/theme-toggle-button.component';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    ThemeToggleButtonComponent,
    ThemeConfiguratorButtonComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {}
