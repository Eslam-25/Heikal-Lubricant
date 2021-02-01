import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent, ProductsComponent } from '../product.module';
import { ProductRoutingModule } from './product-routing.module';
import { AngularMaterial } from 'src/app/angular.material.module';
import { ProductService } from './services/product.service';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { AdminGuardsService } from './guards/admin-guards.service';
import { CanActivateProductService } from './guards/can-activate.product.service';
import { CurrencyPipe } from './pipes/currencypipe';

@NgModule({
  declarations: [
    AddProductComponent, 
    ProductsComponent, 
    ProductDetailComponent, 
    CurrencyPipe
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    AngularMaterial
  ],
  providers: [
    ProductService,
    AdminGuardsService,
    CanActivateProductService
  ],
  entryComponents:[
  ]
})
export class ProductModule { }
