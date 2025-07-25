import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Storage } from '../enums/storage.enum';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly platformId = inject(PLATFORM_ID);
  private isBrowser = signal<boolean>(true);

  constructor() {
    this.isBrowser.set(isPlatformBrowser(this.platformId));
  }

  getItem(key: string, location: Storage) {
    let data = null;
    if (this.isBrowser()) {
      if (location === Storage.local) data = localStorage.getItem(key);
      if (location === Storage.session) data = sessionStorage.getItem(key);
      data = JSON.parse(data);
    }
    return data;
  }

  setItem(key: string, value: any, location: Storage) {
    if (this.isBrowser()) {
      if (location === Storage.local)
        localStorage.setItem(key, JSON.stringify(value));
      if (location === Storage.session)
        sessionStorage.setItem(key, JSON.stringify(value));
    }
  }

  removeItem(key: string, location: Storage) {
    if (this.isBrowser()) {
      if (location === Storage.local) localStorage.removeItem(key);
      if (location === Storage.session) sessionStorage.removeItem(key);
    }
  }

  clear(location: Storage) {
    if (this.isBrowser()) {
      if (location === Storage.local) localStorage.clear();
      if (location === Storage.session) sessionStorage.clear();
    }
  }
}
