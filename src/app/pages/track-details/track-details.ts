import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TracksService } from '../../services/tracks-service';
import { Track } from '../../models/track.model';
import { CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { ELEMENT_DATA } from '../../data/track-data';

@Component({
  selector: 'app-track-details',
  imports: [MatTableModule, CdkDropList, CdkDrag, CommonModule],
  templateUrl: './track-details.html',
  styleUrl: './track-details.css',
})
export class TrackDetails {
  trackId!: string;
  track: any;

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private trackService: TracksService,
  ) {
    this.trackId = this.ActivatedRoute.snapshot.params['id'];
    this.trackService.getTracks().subscribe((tracks: Track[]) => {
      this.track = tracks.find((t) => t.id === this.trackId);
    });
  }

  columns = [
    { key: 'position', label: 'No.' },
    { key: 'teamName', label: 'Team Name' },
    { key: 'lastLap', label: 'Last Lap' },
    { key: 'bestLap', label: 'Best Lap' },
    { key: 'segmentAvg', label: 'Segment Avg' },
    { key: 'segmentBest', label: 'Segment Best' },
    { key: 'segment10Best', label: 'Segment 10 Best' },
    { key: 'segmentTime', label: 'Segment Time' },
    { key: 'gap', label: 'Gap' },
    { key: 'pits', label: 'Pits' },
  ];
  dataSource = ELEMENT_DATA;

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }
}
