import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Track } from '../../models/track.model';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dialog',
  imports: [MatDialogModule, MatButtonModule, FormsModule, CommonModule, MatInputModule],
  templateUrl: './dialog.html',
  styleUrl: './dialog.css',
})
export class Dialog {
  track: Track;
  isEdit: boolean;

  constructor(
    public dialogRef: MatDialogRef<Dialog>,
    @Inject(MAT_DIALOG_DATA) public data: Track | null,
  ) {
    this.track = data
      ? { ...data }
      : {
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
    this.isEdit = !!data; // true если редактируем
  }

  closeDialog() {
    this.dialogRef.close();
  }

  saveTrack() {
    // возвращаем трек наружу
    this.dialogRef.close(this.track);
  }
}
