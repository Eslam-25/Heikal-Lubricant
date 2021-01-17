import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    lineName: new FormControl({ value: '', disabled: true }, [Validators.required]),
    dayName: new FormControl('', [Validators.required])
  });
  daysOfWeek: string[] = [];
  linesOfDay: string[] = [];
  updatedClientId: number = 0;

  constructor(
    private lineService: LineService,
    private clientService: ClientServie,
    private snackBarService: SnackBarServie,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.daysOfWeek = this.lineService.daysOfWeek();
    this.prepareLinesOfSelectedDay();
    this.activatedRoute.queryParams.subscribe(data => {
      this.updatedClientId = data['clientId'] ? data['clientId'] : 0;
      if (this.updatedClientId)
        this.clientService.getClient(this.updatedClientId).subscribe(clientData => {
          this.clientFormInfo.setValue(clientData)
        })
    })
  }

  prepareLinesOfSelectedDay() {
    this.dayName.valueChanges.subscribe(value => {
      this.lineService.getLines().subscribe(lines => {
        this.lineName.enable({ onlySelf: true });
        this.linesOfDay = lines.filter(line => line.dayName == value && line.isActive).map(line => line.lineName);
      });
    })
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
  get lineName() {
    return this.clientFormInfo.get('lineName');
  }
  get dayName() {
    return this.clientFormInfo.get('dayName');
  }

  onSubmit() {
    this.clientFormInfo.markAllAsTouched();
    if (this.clientFormInfo.valid && this.updatedClientId == 0) {
      this.clientService.add(this.clientFormInfo.value);
      this.snackBarService.showSnackBar("تم اضافة العميل بنجاح");
      this.router.navigate(['clients/list']);
    }
    else if (this.clientFormInfo.valid && this.updatedClientId > 0) {
      this.clientFormInfo.controls['lineName'].setValue(this.lineName.value);
      this.clientService.update(this.clientFormInfo.value);
      this.snackBarService.showSnackBar("تم تعديل العميل بنجاح");
      this.router.navigate(['clients/list']);
    }
  }

}
