import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductComponent, ProductsComponent } from '../product.module';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { AdminGuardsService } from './guards/admin-guards.service';
import { CanActivateProductService } from './guards/can-activate.product.service';

const routes: Routes = [
    {path: 'product', component: AddProductComponent, canActivate: [AdminGuardsService]},
    {path: 'list', component: ProductsComponent, canActivate: [CanActivateProductService]},
    {path: 'product-detail/:id', component: ProductDetailComponent, canActivate: [CanActivateProductService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
