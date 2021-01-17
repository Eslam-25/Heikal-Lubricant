import { Component, Inject, OnInit } from '@angular/core';
import { LineModel } from '../../models/line.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LineService } from '../../services/line.service';
import { SnackBarServie } from 'src/app/modules/shared.module/components/snack-bar/snack-bar.service';

@Component({
  selector: 'app-line-update-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  deletedLine: LineModel;
  constructor(@Inject(MAT_DIALOG_DATA) private dialogData: any,
    private lineService: LineService,
    private snackBarService: SnackBarServie,
    private dialogRef: MatDialogRef<DeleteDialogComponent>
  ) {
    this.deletedLine = this.dialogData.deletedLine
  }

  ngOnInit() {
  }

  deleteLine() {
    const isDeleted = this.lineService.remove(this.deletedLine.id);
    if(isDeleted){
      this.dialogRef.close({event: 'deleted'});
      this.snackBarService.showSnackBar("تم حذف الخط بنجاح");
    }
  }
}
