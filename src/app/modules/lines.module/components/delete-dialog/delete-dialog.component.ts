import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LineService } from '../../services/line.service';
import { SnackBarServie } from 'src/app/modules/shared.module/components/snack-bar/snack-bar.service';
import { LineModel } from '../../models/line.model';
import { DayModel } from '../../models/day.model';

@Component({
  selector: 'app-line-update-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  deletedLine: LineModel;
  daysOfWeek: DayModel[];

  constructor(@Inject(MAT_DIALOG_DATA) private dialogData: any,
    private lineService: LineService,
    private snackBarService: SnackBarServie,
    private dialogRef: MatDialogRef<DeleteDialogComponent>
  ) {
    this.deletedLine = this.dialogData.deletedLine
  }

  ngOnInit() {
    this.lineService.daysOfWeek().subscribe(items => {
      this.daysOfWeek = items;
      this.deletedLine.dayId = items.find(d => d.dayName == this.dialogData.deletedLine.dayName).id;
    })
  }

  deleteLine() {
    this.lineService.remove(this.deletedLine).subscribe(() => {
      this.dialogRef.close({event: 'deleted'});
      this.snackBarService.showSnackBar("تم حذف الخط بنجاح");
    });
  }
}
