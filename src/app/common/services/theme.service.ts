import {
  computed,
  effect,
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { PrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { updatePreset } from '@primeng/themes';
import { ColorPalette, Theme } from '@interfaces/theme.interface';

const DEFAULT_THEME: Theme = {
  primary: 'blue',
  ripple: true,
  darkMode: false,
};

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly STORAGE_KEY = 'theme';

  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);
  private readonly config = inject(PrimeNG);

  private readonly colorOptions = [
    'emerald',
    'green',
    'lime',
    'orange',
    'amber',
    'yellow',
    'teal',
    'cyan',
    'sky',
    'blue',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
    'rose',
  ];

  public theme = signal<Theme>(DEFAULT_THEME);
  public transitionComplete = signal<boolean>(false);

  public primaryColors = computed<ColorPalette[]>(() => {
    const presetPalette = Aura.primitive;
    const palettes: ColorPalette[] = [{ name: 'noir', palette: {} }];

    this.colorOptions.forEach((color) => {
      palettes.push({
        name: color,
        palette: presetPalette[color],
      });
    });

    return palettes;
  });
  public selectedPrimaryColor = computed(() => this.theme().primary);

  constructor() {
    const savedTheme = this.loadTheme();
    this.theme.set(savedTheme || DEFAULT_THEME);

    effect(() => {
      const theme = this.theme();
      if (theme) {
        this.savePreference(theme);
        this.config.ripple.set(theme.ripple);
        this.applyTheme();
        this.handleDarkModeTransition(theme);
      }
    });
  }
  // ******************************* METODOS PARA CAMBIO DE COLOR PRIMARIO ************************************

  /**
   * aplica el tema seleccionado en la APP
   */
  private applyTheme(): void {
    try {
      updatePreset(this.getPresetExt());
    } catch (error) {
      console.error('Error aplicando el tema:', error);
      // Fallback to default theme
      updatePreset(this.getDefaultPreset());
    }
  }

  /**
   * Obtiene la paleta de colores seleccionada
   * @returns paleta de colores
   */
  private getPresetExt() {
    const color = this.primaryColors().find(
      (c) => c.name === this.selectedPrimaryColor()
    );

    if (!color) return this.getDefaultPreset();

    return color.name === 'noir'
      ? this.getNoirPreset()
      : this.getColorPreset(color);
  }

  /**
   * Obtiene la paleta de colores por defecto (Aura - blue)
   * @returns paleta de colores
   */
  private getDefaultPreset() {
    return {
      semantic: {
        primary: Aura.primitive.blue,
        colorScheme: Aura.semantic.colorScheme,
      },
    };
  }

  /**
   * Obtiene la paleta de coloores Noir
   * @returns paleta de colores
   */
  private getNoirPreset() {
    return {
      semantic: {
        primary: {
          50: '{surface.50}',
          100: '{surface.100}',
          200: '{surface.200}',
          300: '{surface.300}',
          400: '{surface.400}',
          500: '{surface.500}',
          600: '{surface.600}',
          700: '{surface.700}',
          800: '{surface.800}',
          900: '{surface.900}',
          950: '{surface.950}',
        },
        colorScheme: {
          light: {
            primary: {
              color: '{primary.950}',
              contrastColor: '#ffffff',
              hoverColor: '{primary.800}',
              activeColor: '{primary.700}',
            },
            highlight: {
              background: '{primary.950}',
              focusBackground: '{primary.700}',
              color: '#ffffff',
              focusColor: '#ffffff',
            },
          },
          dark: {
            primary: {
              color: '{primary.50}',
              contrastColor: '{primary.950}',
              hoverColor: '{primary.200}',
              activeColor: '{primary.300}',
            },
            highlight: {
              background: '{primary.50}',
              focusBackground: '{primary.300}',
              color: '{primary.950}',
              focusColor: '{primary.950}',
            },
          },
        },
      },
    };
  }

  /**
   * Configura el color seleccionado y devuelve la paleta de colores correspondiente
   * @param color Color seleccionado
   * @returns paleta de colores
   */
  private getColorPreset(color: ColorPalette) {
    return {
      semantic: {
        primary: color.palette,
        colorScheme: {
          light: {
            primary: {
              color: '{primary.500}',
              contrastColor: '#ffffff',
              hoverColor: '{primary.600}',
              activeColor: '{primary.700}',
            },
            highlight: {
              background: '{primary.50}',
              focusBackground: '{primary.100}',
              color: '{primary.700}',
              focusColor: '{primary.800}',
            },
          },
          dark: {
            primary: {
              color: '{primary.400}',
              contrastColor: '{surface.900}',
              hoverColor: '{primary.300}',
              activeColor: '{primary.200}',
            },
            highlight: {
              background: 'color-mix(in srgb, {primary.400}, transparent 84%)',
              focusBackground:
                'color-mix(in srgb, {primary.400}, transparent 76%)',
              color: 'rgba(255,255,255,.87)',
              focusColor: 'rgba(255,255,255,.87)',
            },
          },
        },
      },
    };
  }

  // ******************************* METODOS PARA CAMBIO DE COLOR PRIMARIO ************************************
  // ******************************** METODOS PARA CAMBIO DE TEMA (CLARO / OSCURO) ***********************************

  /**
   * Inicia el cambio del modo oscuro/claro con una transición
   * @param theme thema seleccionado
   */
  private handleDarkModeTransition(theme: Theme): void {
    if (isPlatformBrowser(this.platformId)) {
      if ((document as any).startViewTransition) {
        this.startViewTransition(theme.darkMode);
      } else {
        this.toggleDarkMode(theme.darkMode);
        this.onTransitionEnd();
      }
    }
  }

  /**
   * Inicia la trancicion para cambiar el tema
   * @param darkMode modo del tema
   */
  private startViewTransition(darkMode: boolean): void {
    const transition = (document as any).startViewTransition(() => {
      this.toggleDarkMode(darkMode);
    });

    transition.ready.then(() => this.onTransitionEnd());
  }

  /**
   * Finaliza la trancición
   */
  private onTransitionEnd() {
    this.transitionComplete.set(true);
    setTimeout(() => {
      this.transitionComplete.set(false);
    });
  }

  /**
   * Cambia la clase del tema en el documento
   * @param darkMode modo del tema
   */
  private toggleDarkMode(darkMode: boolean): void {
    if (darkMode) {
      this.document.documentElement.classList.add('p-dark');
    } else {
      this.document.documentElement.classList.remove('p-dark');
    }
  }

  // ******************************** METODOS PARA CAMBIO DE TEMA (CLARO / OSCURO) ***********************************

  // ******************************** METODOS PARA OBTENER Y GUARDAR TEMA PREFERIDO EN LOCALSTORAGE **************************************

  /**
   * Obtiene el tema guardado en localStorage
   * @returns retorna el tema obtenido
   */
  public loadTheme(): Theme | null {
    if (!isPlatformBrowser(this.platformId)) return null;

    try {
      const storedState = localStorage.getItem(this.STORAGE_KEY);
      return storedState ? JSON.parse(storedState) : null;
    } catch (error) {
      console.error('Error al cargar el tema de localStorage:', error);
      return null;
    }
  }

  /**
   * Guarda el tema seleccionado en localStorage
   *
   * @param theme Tema seleccionado a guardar
   */
  public savePreference(theme: Theme) {
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(theme));
      } catch (error) {
        console.error('Error al guardar tema en localStorage:', error);
      }
    }
  }

  // ******************************** METODOS PARA OBTENER Y GUARDAR TEMA PREFERIDO EN LOCALSTORAGE **************************************
}
