import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { LocalStorageService } from 'src/app/config/local-storage.service';
import { UserRole } from 'src/app/modules/authentication.module/enums/roles.enum';
import { UserAuthenticateModel } from 'src/app/modules/authentication.module/models/user.authenticate.model';
import { ClientModel } from '../../models/client.model';
import { ClientServie } from '../../services/client.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { map } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['isActive', 'lineName', 'dayName', 'address', 'phoneNumber', 'clientName', 'id'];
  clients = new MatTableDataSource();
  currentUser: UserAuthenticateModel = null;

  @ViewChild(MatSort, null) sort: MatSort;
  @ViewChild(MatPaginator, null) paginator: MatPaginator;

  constructor(
    private clientService: ClientServie,
    private dialog: MatDialog,
    private localStorageService: LocalStorageService,
  ) {
  }
  ngAfterViewInit(): void {
    this.clients.sort = this.sort;
    this.clients.paginator = this.paginator;
  }


  ngOnInit() {
    this.prepareClients();
    this.prepareUserPermission();
  }

  prepareClients() {
    this.clientService.getClients()
      .pipe(
        map(val => {
          const mappedClientsToDisplay = [];
          val.forEach(element => {
            mappedClientsToDisplay.push({
              id: element.id,
              clientName: element.clientName,
              lineName: element.line.lineName,
              dayName: element.day.dayName,
              address: element.address,
              phoneNumber: element.phoneNumber,
              isActive: element.isActive
            })
          });
          return mappedClientsToDisplay;
        })
      )
      .subscribe(result => {
        this.clients.data = result.filter(r => r.id > 0);
      })
  }

  prepareUserPermission() {
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
        this.clients.data.splice(0, 0)
        this.prepareClients();
      }
    })
  }

}
