import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LocalStorageService } from 'src/app/config/local-storage.service';
import { UserRole } from 'src/app/modules/authentication.module/enums/roles.enum';
import { UserAuthenticateModel } from 'src/app/modules/authentication.module/models/user.authenticate.model';
import { ClientModel } from '../../models/client.model';
import { ClientServie } from '../../services/client.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  displayedColumns: string[] = ['lineName', 'dayName', 'address', 'phoneNumber', 'clientName', 'id'];
  clients: ClientModel[] = [];
  currentUser: UserAuthenticateModel = null;

  constructor(
    private clientService: ClientServie,
    private dialog: MatDialog,
    private localStorageService: LocalStorageService
  ) { }


  ngOnInit() {
    this.prepareClients();
    this.prepareUserPermission();
  }

  prepareClients() {
    this.clientService.getClients().subscribe(data => {
      this.clients = data.filter(d => d.isActive);
    })
  }

  prepareUserPermission(){
    this.currentUser = this.localStorageService.getCurrentUser();
    if (this.currentUser && this.currentUser.role !== UserRole.USER) {
      this.displayedColumns.splice(0, 0, "edit")
      this.displayedColumns.splice(0, 0, "delete")
    }
  }

  openDeleteDialog(deletedClient: ClientModel) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: deletedClient
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == "deleted") {
        this.prepareClients();
      }
    })
  }

}
