import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/config/local-storage.service';
import { UserAuthenticateModel } from 'src/app/modules/authentication.module/models/user.authenticate.model';
import { ProductModel } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productFormInfo = new FormGroup({
    id: new FormControl(''),
    isActive: new FormControl(''),
    productName: new FormControl('', [Validators.required]),
    liter: new FormControl('', [Validators.required]),
    kileMeter: new FormControl('', [Validators.required]),
    numberOfUnit: new FormControl('', [Validators.required]),
    sae: new FormControl('', [Validators.required]),
    api: new FormControl('', [Validators.required]),
    buyPrice: new FormControl('', [Validators.required]),
    sellingPrice: new FormControl('', [Validators.required]),
    imagePath: new FormControl('', [Validators.required]),
    creationDate: new FormControl('', [Validators.required]),
  })
  product: ProductModel;
  currentUser: UserAuthenticateModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productSevice: ProductService,
    private localStorageService: LocalStorageService
    ) { }

  ngOnInit() {
    this.preparePermission();

    this.activatedRoute.params.subscribe(param => {
      this.productSevice.getProduct(param.id).subscribe(product => {
        this.product = product;
        this.productFormInfo.setValue(product);
        this.productFormInfo.disable();
      });
    })
  }

  preparePermission(){
    this.currentUser = this.localStorageService.getCurrentUser();
  }

}
