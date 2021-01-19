import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { LineViewModel } from '../../models/line-view.model';
import { LineModel } from '../../models/line.model';
import { LineService } from '../../services/line.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';

@Component({
  selector: 'app-line-update',
  templateUrl: './line-update.component.html',
  styleUrls: ['./line-update.component.css']
})
export class LineUpdateComponent implements OnInit {

  lineFormInfo = new FormGroup({
    lines: new FormControl([]),
  });

  lineDay: string = '';
  linesOfDay: LineViewModel[] = [];
  displayedColumns: string[] = ['delete', 'edit' ,'isActive','lineName' ,'id'];
  isUpdate: boolean = true;
  lineStatus: boolean;

  constructor(private activatedRoute: ActivatedRoute, private lineService: LineService, private dialog: MatDialog) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
      this.lineDay = data.id;
    });

    this.prepareLinesOfDay();
  }

  prepareLinesOfDay(){
    ///get data from resolver
    this.lineService.getLines().subscribe(linesData => {
      this.linesOfDay = linesData.filter(line => line.dayName === this.lineDay);
      const activeLines = linesData.filter(line => line.dayName === this.lineDay && line.isActive);
      this.lineFormInfo.get('lines').setValue(activeLines.map(line => line.id));
    });
  }

  openDeleteDialog(line: LineModel) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        deletedLine: line
      } 
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event === 'deleted'){
        this.prepareLinesOfDay();
      }
    })
  }

  openUpdateDialog(line: LineModel){
    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      data: {
        updatedLine: line
      },
      width: '30rem'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event === 'updated'){
        this.prepareLinesOfDay();
      }
    })
  }
  
}
