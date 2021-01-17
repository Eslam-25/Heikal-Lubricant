import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SnackBarServie } from 'src/app/modules/shared.module/components/snack-bar/snack-bar.service';
import { LineModel } from '../../models/line.model';
import { LineService } from '../../services/line.service';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css']
})
export class UpdateDialogComponent implements OnInit {

  lineFormInfo = new FormGroup({
    lineName: new FormControl('', [Validators.required]),
    lineStatus: new FormControl('', [Validators.required])
  });

  updatedLine: LineModel;
  constructor(@Inject(MAT_DIALOG_DATA) private dialogData: any,
    private snackBarService: SnackBarServie,
    private lineService: LineService,
    private dialogRef: MatDialogRef<UpdateDialogComponent>
  ) {
    this.updatedLine = dialogData.updatedLine
  }

  ngOnInit() {
    this.lineFormInfo.controls['lineName'].setValue(this.updatedLine.lineName);
    this.lineFormInfo.controls['lineStatus'].setValue(this.updatedLine.isActive);
  }

  get lineName() {
    return this.lineFormInfo.get('lineName');
  }

  get lineStatus() {
    return this.lineFormInfo.get('lineStatus');
  }

  onSubmit() {
    this.lineFormInfo.controls['lineName'].markAsTouched();
    this.lineFormInfo.controls['lineStatus'].markAsTouched();

    if (this.lineFormInfo.valid) {
      this.updatedLine.lineName = this.lineName.value;
      this.updatedLine.isActive = this.lineStatus.value;
      this.lineService.add(this.lineFormInfo.value);
      this.snackBarService.showSnackBar("تم تعديل الخط بنجاح");
      this.dialogRef.close({event: 'updated'})
    }
  }

}
