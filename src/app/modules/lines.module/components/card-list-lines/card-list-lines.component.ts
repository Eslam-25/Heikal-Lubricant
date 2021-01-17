import { Component, Input, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/config/local-storage.service';
import { UserAuthenticateModel } from 'src/app/modules/authentication.module/models/user.authenticate.model';
import { LineModel } from '../../models/line.model';

@Component({
  selector: 'app-card-list-lines',
  templateUrl: './card-list-lines.component.html',
  styleUrls: ['./card-list-lines.component.css']
})
export class CardListLinesComponent implements OnInit {

  @Input() linesDay: LineModel[] = [];
  currentUser: UserAuthenticateModel;
  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.currentUser = this.localStorageService.getCurrentUser();
  }

}
