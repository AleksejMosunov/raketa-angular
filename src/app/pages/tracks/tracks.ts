import { CommonModule } from '@angular/common';
import { Track } from '../../models/track.model';
import { TracksService } from '../../services/tracks-service';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { Dialog } from '../../components/dialog/dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-tracks',
  imports: [MatCardModule, MatButtonModule, CommonModule, RouterModule, MatIconModule],
  templateUrl: './tracks.html',
  styleUrl: './tracks.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tracks {
  private tracksService = inject(TracksService);

  tracks = signal<Track[]>([]);
  activeTracks = signal<Track | null>(null);
  constructor(private dialog: MatDialog) {
    // Инициализация данных
    this.tracksService.getTracks().subscribe((tracks) => this.tracks.set(tracks));
    this.tracksService
      .getActiveTrack()
      .subscribe((activeTracks) => this.activeTracks.set(activeTracks));
    console.log(this.tracks());
  }

  startRace(track: Track) {
    this.tracksService
      .startTrackRace(track.id)
      .pipe(switchMap(() => this.tracksService.getTracks()))
      .subscribe((tracks) => this.tracks.set(tracks));
  }

  stopRace(track: Track) {
    this.tracksService
      .stopTrackRace(track.id)
      .pipe(switchMap(() => this.tracksService.getTracks()))
      .subscribe((tracks) => this.tracks.set(tracks));
  }

  openDialog(track?: Track): void {
    const dialogRef = this.dialog.open(Dialog, {
      data: track ? { ...track } : null, // передаем данные трека, если редактируем
    });

    dialogRef.afterClosed().subscribe((result: Partial<Track> | undefined) => {
      if (!result) return; // если закрыли без изменений

      if (track) {
        // Если track существует — обновляем
        this.tracksService.updateTrack(track.id, result).subscribe({
          next: (updatedTrack) => {
            // обновляем сигнал
            this.tracks.set(
              this.tracks().map((t) => (t.id === updatedTrack.id ? updatedTrack : t)),
            );
          },
          error: (err) => console.error('Failed to update track', err),
        });
      } else {
        // Если track нет — создаем новый
        this.tracksService.createTrack(result).subscribe({
          next: (createdTrack) => {
            this.tracks.set([...this.tracks(), createdTrack]);
          },
          error: (err) => console.error('Failed to create track', err),
        });
      }
    });
  }

  deleteTrack(track: Track) {
    console.log('Delete track');
    this.tracksService.deleteTrack(track.id).subscribe({
      next: () => {
        this.tracks.set(this.tracks().filter((t) => t.id !== track.id));
        console.log(`Track ${track.name} deleted`);
      },
      error: (err) => console.error('Delete failed', err),
    });
  }

  // editTrack(track: Track) {
  //   console.log('Update Track');
  //   this.tracksService.updateTrack(track.id, track).subscribe({
  //     next: (updatedTrack) => {
  //       // обновляем сигнал tracks
  //       this.tracks.set(this.tracks().map((t) => (t.id === track.id ? updatedTrack : t)));
  //     },
  //     error: (err) => console.error('Failed to update track', err),
  //   });
  // }
}
