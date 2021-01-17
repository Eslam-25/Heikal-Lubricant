import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/config/local-storage.service';
import { UserAuthenticateModel } from 'src/app/modules/authentication.module/models/user.authenticate.model';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {

  currentUser: UserAuthenticateModel = null;
  constructor(private localStorageServie: LocalStorageService) {
  }

  ngOnInit() {
    this.currentUser = this.localStorageServie.getCurrentUser();
  }

}
