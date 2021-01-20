import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UsersComponent } from './components/users/users.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { AngularMaterial } from 'src/app/angular.material.module';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    UsersComponent, 
    UserFormComponent
  ],
  imports: [
    CommonModule,
    AngularMaterial,
    UserRoutingModule
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
