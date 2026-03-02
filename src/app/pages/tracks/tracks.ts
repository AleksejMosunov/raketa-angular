import { CommonModule } from '@angular/common';
import { Track } from '../../models/track.model';
import { TracksService } from '../../services/tracks-service';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tracks',
  imports: [MatCardModule, MatButtonModule, CommonModule, RouterModule],
  templateUrl: './tracks.html',
  styleUrl: './tracks.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tracks {
  private tracksService = inject(TracksService);

  tracks = toSignal(this.tracksService.getTracks(), { initialValue: [] });
}
