import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DayModel } from 'src/app/modules/lines.module/models/day.model';
import { LineViewModel } from 'src/app/modules/lines.module/models/line-view.model';
import { LineService } from 'src/app/modules/lines.module/services/line.service';
import { SnackBarServie } from 'src/app/modules/shared.module/components/snack-bar/snack-bar.service';
import { ClientServie } from '../../services/client.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {

  clientFormInfo = new FormGroup({
    id: new FormControl(''),
    isActive: new FormControl(''),
    clientName: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    lineId: new FormControl({ value: '', disabled: true }, [Validators.required]),
    dayName: new FormControl('', [Validators.required])
  });

  daysOfWeek: DayModel[] = [];
  linesOfDay: LineViewModel[] = [];
  updatedClientId: number = 0;

  constructor(
    private lineService: LineService,
    private clientService: ClientServie,
    private snackBarService: SnackBarServie,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.lineService.daysOfWeek().subscribe(items => {
      this.daysOfWeek = items;
    });
    this.prepareLinesOfSelectedDay();
    this.prepareClientForUpdating();
  }

  prepareClientForUpdating() {
    this.activatedRoute.queryParams.subscribe(data => {
      this.updatedClientId = data['clientId'] ? data['clientId'] : 0;

      if (this.updatedClientId)
        this.clientService.getClient(this.updatedClientId).subscribe(clientData => {

          this.clientFormInfo.get('id').setValue(clientData.id);
          this.isActive.setValue(clientData.isActive);
          this.clientName.setValue(clientData.clientName);
          this.phoneNumber.setValue(clientData.phoneNumber);
          this.address.setValue(clientData.address);

          this.lineService.getLines().subscribe(lines => {
            this.linesOfDay = this.linesOfDay.filter(line => line.isActive);
            const lineDay = lines.find(line => line.id == clientData.lineId);
            this.dayName.setValue(lineDay.dayName);
            this.lineId.setValue(clientData.lineId);
          });
        })

    });
  }

  prepareLinesOfSelectedDay() {
    this.dayName.valueChanges.subscribe(value => {

      this.lineService.getLines().subscribe(lines => {
        this.lineId.enable({ onlySelf: true });
        this.linesOfDay = lines.filter(line => line.dayName == value && line.isActive);
      });

    });
  }

  get clientName() {
    return this.clientFormInfo.get('clientName');
  }
  get phoneNumber() {
    return this.clientFormInfo.get('phoneNumber');
  }
  get address() {
    return this.clientFormInfo.get('address');
  }
  get lineId() {
    return this.clientFormInfo.get('lineId');
  }
  get dayName() {
    return this.clientFormInfo.get('dayName');
  }
  get isActive() {
    return this.clientFormInfo.get('isActive');
  }

  onSubmit() {
    this.clientFormInfo.markAllAsTouched();

    if (this.clientFormInfo.valid && this.updatedClientId == 0) {
      this.clientService.add(this.clientFormInfo.value).subscribe(() => {
        this.snackBarService.showSnackBar("تم اضافة العميل بنجاح");
        this.router.navigate(['clients/list']);
      })
    }
    else if (this.clientFormInfo.valid && this.updatedClientId > 0) {
      this.lineId.setValue(this.lineId.value);
      this.clientService.update(this.clientFormInfo.value).subscribe(() => {
        this.snackBarService.showSnackBar("تم تعديل العميل بنجاح");
        this.router.navigate(['clients/list']);
      });
    }
  }

}
