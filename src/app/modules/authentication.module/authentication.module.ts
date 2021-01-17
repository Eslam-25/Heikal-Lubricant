import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterial } from 'src/app/angular.material.module';
import { LoginComponent, LogoutComponent } from '../authentication.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationService } from './services/authentication.service';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    AngularMaterial,
  ],
  exports: [
    LoginComponent
  ],
  providers:[
    AuthenticationService
  ],
  entryComponents: [
    LogoutComponent
  ]
})
export class AuthenticationModule { }
