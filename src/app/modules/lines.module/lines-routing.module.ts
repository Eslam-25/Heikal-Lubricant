import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LineFormComponent, LineListComponent } from '../lines.module';
import { LineUpdateComponent } from './components/line-update/line-update.component';
import { CanUserActivate } from './guards/can-user-activate.service';
import { LinesCanActivate } from './guards/lines.can-activate.service';
import { LinesResolveService } from './guards/lines.resolve.service';

const routes: Routes = [
  { path: 'list', component: LineListComponent, resolve: {lines: LinesResolveService} , canActivate: [CanUserActivate] },
  { path: 'new-line', component: LineFormComponent, canActivate: [LinesCanActivate] },
  { path: 'update-line/:id', component: LineUpdateComponent, canActivate: [LinesCanActivate] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LinesRoutingModule { }
