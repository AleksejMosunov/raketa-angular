import { Injectable, signal } from '@angular/core';
import { Track } from '../models/track.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class TracksService {
  url: string = environment.apiUrl + '/tracks';
  constructor(private http: HttpClient) {}

  getTracks() {
    return this.http.get<Track[]>(this.url);
  }

  createTrack(track: Partial<Track>) {
    return this.http.post<Track>(this.url, track);
  }

  updateTrack(id: string, track: Partial<Track>) {
    return this.http.put<Track>(this.url, track);
  }

  deleteTrack(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }

  startTrackRace(id: string) {
    return this.http.post(`${this.url}/${id}/start`, {});
  }

  stopTrackRace(id: string) {
    return this.http.post(`${this.url}/${id}/stop`, {});
  }

  getActiveTrack() {
    return this.http.get<Track>(`${this.url}/active`);
  }
}
