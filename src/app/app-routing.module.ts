import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: 'home',component: HomeComponent},
  {path: 'lines', loadChildren: () => import('./modules/lines.module/lines.module').then(m=>m.LinesModule)},
  {path: 'clients', loadChildren: () => import('./modules/client.module/client.module').then(c=>c.ClientModule)},
  {path: 'products', loadChildren: () => import('./modules/product.module/product.module').then(p=>p.ProductModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
