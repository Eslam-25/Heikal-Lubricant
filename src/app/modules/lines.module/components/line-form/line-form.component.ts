import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackBarServie } from 'src/app/modules/shared.module/components/snack-bar/snack-bar.service';
import { DayModel } from '../../models/day.model';
import { LineService } from '../../services/line.service';

@Component({
  selector: 'app-line-form',
  templateUrl: './line-form.component.html',
  styleUrls: ['./line-form.component.css']
})
export class LineFormComponent implements OnInit {

  lineFormInfo = new FormGroup({
    lineName: new FormControl('', [Validators.required]),
    dayId: new FormControl('', [Validators.required])
  });

  daysOfWeek: DayModel[] = [];

  constructor(private lineService: LineService, private router: Router, private snackBarService: SnackBarServie) { }

  ngOnInit() {
    this.lineService.daysOfWeek().subscribe(items => {
      this.daysOfWeek = items;
    });
  }

  get lineName() {
    return this.lineFormInfo.get('lineName');
  }

  get dayId() {
    return this.lineFormInfo.get('dayId');
  }

  onSubmit() {
    this.lineFormInfo.controls['lineName'].markAsTouched();
    this.lineFormInfo.controls['dayId'].markAsTouched();

    if (this.lineFormInfo.valid) {
      this.lineService.add(this.lineFormInfo.value).subscribe(() => {
        this.snackBarService.showSnackBar("تم اضافة الخط بنجاح");
        this.router.navigate(["lines/list"]);
      });
    }
  }

}
