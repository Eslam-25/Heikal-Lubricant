import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SnackBarServie } from 'src/app/modules/shared.module/components/snack-bar/snack-bar.service';
import { ClientModel } from '../../models/client.model';
import { ClientServie } from '../../services/client.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  deletedClient: ClientModel = null;
  constructor(@Inject(MAT_DIALOG_DATA) private dialogData: any, 
    private clientService: ClientServie,
    private snackBarService: SnackBarServie,
    private dialogRef: MatDialogRef<DeleteDialogComponent>
  ) { 
    this.deletedClient = dialogData;
  }

  ngOnInit() {
  }

  deleteClient(){
    this.clientService.remove(this.deletedClient).subscribe(() => {
      this.dialogRef.close({event: 'deleted'});
      this.snackBarService.showSnackBar("تم حذف العميل بنجاح");
    })
  }


}
