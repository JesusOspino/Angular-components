import { CommonModule, NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeConfiguratorButtonComponent } from '@shared/theme-configurator-button/theme-configurator-button.component';
import { ThemeToggleButtonComponent } from '@shared/theme-toggle-button/theme-toggle-button.component';
import { SplitterModule } from 'primeng/splitter';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    ThemeToggleButtonComponent,
    ThemeConfiguratorButtonComponent,
    SplitterModule,
    NgClass,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  menuVisible = signal<boolean>(false);

  toggleMenu() {
    this.menuVisible.update((visible) => !visible);
  }
}
