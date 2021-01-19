import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SnackBarServie } from 'src/app/modules/shared.module/components/snack-bar/snack-bar.service';
import { DayModel } from '../../models/day.model';
import { LineModel } from '../../models/line.model';
import { LineService } from '../../services/line.service';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css']
})
export class UpdateDialogComponent implements OnInit {

  lineFormInfo = new FormGroup({
    id: new FormControl(''),
    lineName: new FormControl('', [Validators.required]),
    isActive: new FormControl(''),
    dayId: new FormControl('', [Validators.required])
  });

  updatedLine: LineModel;
  daysOfWeek: DayModel[];

  constructor(@Inject(MAT_DIALOG_DATA) private dialogData: any,
    private snackBarService: SnackBarServie,
    private lineService: LineService,
    private dialogRef: MatDialogRef<UpdateDialogComponent>
  ) {
    this.updatedLine = dialogData.updatedLine
  }
  
  ngOnInit() {
    this.lineService.daysOfWeek().subscribe(items => {
      this.daysOfWeek = items;
      this.lineFormInfo.controls['id'].setValue(this.updatedLine.id);
      this.lineFormInfo.controls['lineName'].setValue(this.updatedLine.lineName);
      this.lineFormInfo.controls['isActive'].setValue(this.updatedLine.isActive);
      this.lineFormInfo.controls['dayId'].setValue(items.find(d => d.dayName == this.dialogData.updatedLine.dayName).id);
    })
  }

  get lineName() {
    return this.lineFormInfo.get('lineName');
  }

  get isActive() {
    return this.lineFormInfo.get('isActive');
  }

  get dayId() {
    return this.lineFormInfo.get('dayId');
  }

  onSubmit() {
    this.lineFormInfo.markAllAsTouched();
    if (this.lineFormInfo.valid) {
      this.lineService.update(this.lineFormInfo.value).subscribe(() => {
        this.snackBarService.showSnackBar("تم تعديل الخط بنجاح");
        this.dialogRef.close({ event: 'updated' })
      });
    }
  }

}
