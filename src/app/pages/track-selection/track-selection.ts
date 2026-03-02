import { Component } from '@angular/core';
import { TrackService } from '../../services/track-service';
import { Track } from '../../models/track.model';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { RaceService } from '../../services/race-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-track-selection',
  imports: [CommonModule, FormsModule],
  templateUrl: './track-selection.html',
  styleUrl: './track-selection.css',
})
export class TrackSelection {
  tracks: Observable<Track[]>;
  selectedTrackId: string | null = null;
  constructor(
    private trackService: TrackService,
    private raceService: RaceService,
  ) {
    this.tracks = this.trackService.getTracks();
  }

  onTrackChange() {
    this.raceService.selectedTrackId = this.selectedTrackId;
  }

  startRace() {
    this.raceService.startRace();
  }
}
