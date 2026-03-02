import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RaceService {
  private apiUrl = '${environment.apiUrl}/races';
  selectedTrackId: string | null = null;

  constructor() {}

  startRace() {
    // Логика для запуска гонки на выбранной трассе
    console.log(`Starting race on track ${this.selectedTrackId}`);
    // Здесь можно добавить HTTP запрос к серверу для создания новой гонки
  }

  getRaces() {
    if (!this.selectedTrackId) {
      console.error('No track selected');
      return;
    }
    // Логика для получения списка гонок
    console.log('Fetching races', this.selectedTrackId);
    // Здесь можно добавить HTTP запрос к серверу для получения списка гонок
  }
}
