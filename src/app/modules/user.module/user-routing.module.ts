import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UsersComponent } from './components/users/users.component';
import { AdminCanActivateGuardsService } from './guards/can-active.admin.guards';

const routes: Routes = [
  {path: 'user', component: UserFormComponent, canActivate:[AdminCanActivateGuardsService]},
  {path: 'list', component: UsersComponent, canActivate:[AdminCanActivateGuardsService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
