import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientFormComponent, ClientsComponent, DeleteDialogComponent } from '../client.module';
import { ClientRoutingModule } from './client-routing.module';
import { AngularMaterial } from 'src/app/angular.material.module';
import { LinesModule } from '../lines.module/lines.module';
import { ClientServie } from './services/client.service';
import { ClientsCanActivate } from './grauds/clients.can-activate.service';
import { CanUserActivate } from './grauds/can-user.-activate.service';

@NgModule({
  declarations: [
    ClientFormComponent,
    ClientsComponent,
    DeleteDialogComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    AngularMaterial,
    LinesModule
  ],
  providers: [
    ClientServie,
    ClientsCanActivate,
    CanUserActivate
  ],
  entryComponents: [
    DeleteDialogComponent
  ]
})
export class ClientModule { }
