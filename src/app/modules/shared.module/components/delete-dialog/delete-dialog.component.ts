import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  title: string;
  message: string;

  constructor(@Inject(MAT_DIALOG_DATA) private dialogData: any,
    private dialogRef: MatDialogRef<DeleteDialogComponent>) { }

  ngOnInit() {
    this.title = this.dialogData.deletedItem.dialogTitle;
    this.message = this.dialogData.deletedItem.dialogMessage;
  }

  deleteItem() {
    this.dialogRef.close({ event: 'deleted' });
  }
}
