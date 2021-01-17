import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { AngularMaterial } from 'src/app/angular.material.module';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { RouterModule } from '@angular/router';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { SnackBarServie } from './components/snack-bar/snack-bar.service';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    MenuListComponent,
    SnackBarComponent,
    DeleteDialogComponent
  ],
  imports: [
    CommonModule,
    AngularMaterial,
    RouterModule,
  ],
  entryComponents: [
    SnackBarComponent,
    DeleteDialogComponent
  ],
  providers:[
    SnackBarServie
  ],
  exports: [
    LayoutComponent
  ]
})
export class SharedModule { }
