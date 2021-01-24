import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UserViewModel } from '../../models/user-view.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { UserService } from '../../services/user.service';
import { DeleteDialogComponent } from 'src/app/modules/shared.module/components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['delete' ,'edit', 'isActive', 'roleName', 'userName', 'id'];
  users = new MatTableDataSource();
  @ViewChild(MatSort, null) sort: MatSort;
  @ViewChild(MatPaginator, null) paginator: MatPaginator;
  
  constructor(private userService: UserService, private readonly matDialog: MatDialog) { }

  ngAfterViewInit(): void {
    this.users.sort = this.sort;
    this.users.paginator = this.paginator;
  }

  ngOnInit() {
    this.prepareUsers();
  }

  prepareUsers(){
    this.userService.getUsers().subscribe((items: UserViewModel[]) => {
      this.users.data = items;
    });
  }

  openDeleteDialog(element: UserViewModel){
    const dialogRef = this.matDialog.open(DeleteDialogComponent, {
      data: {
        deletedItem:{
          dialogTitle: "حذف موظف",
          dialogMessage: `هل تريد منع الموظف من استخدام النظام؟`
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == "deleted"){
        this.userService.deleteUser(element).subscribe(() => {
          this.users.data.splice(0,0);
          this.prepareUsers();
        })
      }
    })
  }

}
