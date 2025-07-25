import {
  Injectable,
  PLATFORM_ID,
  computed,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private readonly platformId = inject(PLATFORM_ID);
  private isBrowser = signal<boolean>(true);

  private _screenSize = signal({ width: 0, height: 0 });

  constructor() {
    this.isBrowser.set(isPlatformBrowser(this.platformId));
    this.initialize();
  }

  private initialize() {
    if (this.isBrowser()) {
      this._screenSize.set({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      window.addEventListener('resize', () => {
        this._screenSize.set({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      });
    }
  }

  public screenSize = computed(() => this._screenSize());
  public isMobile = computed<boolean>(() => this._screenSize().width < 768);
  public isTablet = computed<boolean>(
    () => this._screenSize().width >= 768 && this._screenSize().width < 992
  );
  public isDesktop = computed<boolean>(() => this._screenSize().width >= 992);
}
