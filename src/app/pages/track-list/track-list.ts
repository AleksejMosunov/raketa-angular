import { Component, signal, effect } from '@angular/core';
import { TrackService } from '../../services/track-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Track } from '../../models/track.model';

@Component({
  selector: 'app-track-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './track-list.html',
  styleUrls: ['./track-list.css'],
})
export class TrackList {
  tracks = signal<Track[]>([]); // сигнал для реактивного UI
  newTrackName = '';
  newTrackHttpPort!: number;
  newTrackWsUrl = '';
  newTrackOfficialTiming = '';

  constructor(private trackService: TrackService) {}

  ngOnInit() {
    // загружаем начальные данные
    this.trackService.getTracks().subscribe((tracks) => this.tracks.set(tracks));
  }

  addTrack() {
    const newTrack: Track = {
      _id: '',
      id: this.newTrackName
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-'),
      name: this.newTrackName,
      httpPort: this.newTrackHttpPort,
      wsUrl: this.newTrackWsUrl,
      officialTiming: this.newTrackOfficialTiming,
      createdAt: new Date(),
    };

    this.trackService.addTrack(newTrack).subscribe({
      next: (track) => {
        this.tracks.update((list) => [...list, track]);

        // очистка формы
        this.newTrackName = '';
        this.newTrackHttpPort = 0;
        this.newTrackWsUrl = '';
        this.newTrackOfficialTiming = '';
      },
    });
  }

  deleteTrack(trackId: string) {
    this.trackService.deleteTrack(trackId).subscribe({
      next: () => {
        this.tracks.update((list) => list.filter((t) => t._id !== trackId));
      },
    });
  }
}
