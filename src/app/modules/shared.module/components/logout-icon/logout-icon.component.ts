import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LocalStorageService } from 'src/app/config/local-storage.service';
import { LogoutComponent } from 'src/app/modules/authentication.module';
import { UserAuthenticateModel } from 'src/app/modules/authentication.module/models/user.authenticate.model';

@Component({
  selector: 'logout-icon',
  templateUrl: './logout-icon.component.html',
  styleUrls: ['./logout-icon.component.css']
})
export class LogoutIconComponent implements OnInit {

  currentUser: UserAuthenticateModel;
  constructor(private dialog: MatDialog,private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.currentUser = this.localStorageService.getCurrentUser();
  }

  onLogout(){
    this.dialog.open(LogoutComponent)
  }
  
}
