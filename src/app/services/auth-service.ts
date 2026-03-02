import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isBrowser = typeof window !== 'undefined';

  // сигнал хранит boolean
  isLoggedIn = signal<boolean>(false);

  constructor() {
    // при инициализации читаем из sessionStorage
    if (this.isBrowser) {
      const stored = sessionStorage.getItem('isLoggedIn');
      this.isLoggedIn.set(stored === 'true');
    }
  }

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === '1234') {
      this.isLoggedIn.set(true);
      if (this.isBrowser) sessionStorage.setItem('isLoggedIn', 'true');
      return true;
    }
    this.isLoggedIn.set(false);
    if (this.isBrowser) sessionStorage.removeItem('isLoggedIn');
    return false;
  }

  logout() {
    this.isLoggedIn.set(false);
    if (this.isBrowser) sessionStorage.removeItem('isLoggedIn');
  }
}
