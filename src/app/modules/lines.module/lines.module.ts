import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LineFormComponent ,LineListComponent, CardListLinesComponent, LineUpdateComponent, DeleteDialogComponent, UpdateDialogComponent } from '../lines.module';
import { AngularMaterial } from 'src/app/angular.material.module';
import { LineService } from './services/line.service';
import { LinesRoutingModule } from './lines-routing.module';
import { LinesResolveService } from './guards/lines.resolve.service';
import { LinesCanActivate } from './guards/lines.can-activate.service';
import { CanUserActivate } from './guards/can-user-activate.service';

@NgModule({
  declarations: [
    LineFormComponent, 
    LineListComponent, 
    CardListLinesComponent, 
    LineUpdateComponent, 
    DeleteDialogComponent, 
    UpdateDialogComponent
  ],
  imports: [
    CommonModule,
    AngularMaterial,
    LinesRoutingModule
  ],
  providers:[
    LineService,
    LinesResolveService,
    LinesCanActivate,
    CanUserActivate
  ],
  entryComponents: [
    DeleteDialogComponent,
    UpdateDialogComponent
  ]
})
export class LinesModule { }
