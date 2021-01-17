import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { LineModel } from '../../models/line.model';
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
  linesOfDay: LineModel[] = [];
  displayedColumns: string[] = ['delete', 'edit' ,'isActive','lineName' ,'id'];
  isUpdate: boolean = true;
  lineStatus: boolean;

  constructor(private activatedRoute: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
      this.lineDay = data.id;
    });

    this.prepareLinesOfDay();
  }

  prepareLinesOfDay(){
    this.activatedRoute.data.subscribe(linesData => {
      this.linesOfDay = linesData.lines.filter(line => line.dayName === this.lineDay);
      const activeLines = linesData.lines.filter(line => line.dayName === this.lineDay && line.isActive);
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
