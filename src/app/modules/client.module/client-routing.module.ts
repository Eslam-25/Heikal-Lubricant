import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientFormComponent, ClientsComponent } from '../client.module';
import { CanUserActivate } from './grauds/can-user.-activate.service';
import { ClientsCanActivate } from './grauds/clients.can-activate.service';

const routes: Routes = [
  {path: 'client-form' , component: ClientFormComponent, canActivate: [ClientsCanActivate]},
  {path: 'list' , component: ClientsComponent, canActivate: [CanUserActivate]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
