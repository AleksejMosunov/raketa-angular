import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { Track } from '../../models/track.model';
import { TracksService } from '../../services/tracks-service';
import { isDate } from 'util/types';

@Component({
  selector: 'app-dialog',
  imports: [MatDialogModule, MatButtonModule, FormsModule, CommonModule, MatInputModule],
  templateUrl: './dialog.html',
  styleUrl: './dialog.css',
})
export class Dialog {
  track: Track = {
    _id: '',
    id: '',
    name: '',
    httpPort: 0,
    wsUrl: '',
    officialTiming: '',
    imgUrl: '',
    openedWs: false,
    createdAt: new Date(),
  };

  constructor(
    public dialogRef: MatDialogRef<Dialog>,
    public trackService: TracksService,
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }

  addTrack(track: Track) {
    this.dialogRef.close(track);
  }
}
