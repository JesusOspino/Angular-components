import { NgStyle } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorPalette } from '@interfaces/theme.interface';
import { ThemeService } from '@services/theme.service';
import { PrimeNG } from 'primeng/config';
import { StyleClassModule } from 'primeng/styleclass';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'app-theme-configurator-button',
  imports: [StyleClassModule, ToggleSwitchModule, FormsModule, NgStyle],
  templateUrl: './theme-configurator-button.component.html',
})
export class ThemeConfiguratorButtonComponent {
  private readonly themeService = inject(ThemeService);
  private config = inject(PrimeNG);

  primaryColors = computed(() => this.themeService.primaryColors());

  selectedPrimaryColor = computed(() =>
    this.themeService.selectedPrimaryColor()
  );

  /**
   * get del ripple
   */
  get ripple() {
    return this.config.ripple();
  }

  /**
   * set del ripple
   */
  set ripple(value: boolean) {
    this.config.ripple.set(value);
    this.themeService.theme.update((current) => ({
      ...current,
      ripple: value,
    }));
  }

  /**
   * obtiene el color primario seleccionado y lo aplica al tema.
   * @param event evento del boton
   * @param color color seleccionado
   */
  updatePrimaryColor(event: Event, color: ColorPalette): void {
    event.stopPropagation();
    this.themeService.theme.update((x) => ({ ...x, primary: color.name }));
  }
}
