import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarServie } from 'src/app/modules/shared.module/components/snack-bar/snack-bar.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

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
    imagePath: new FormControl(''),
    creationDate: new FormControl(''),
  })
  updatedProductId: number = 0;
  isInValid: boolean = false;

  constructor(
    private productService: ProductService,
    private snackBarService: SnackBarServie,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.updatedProductId = params['productId'] ? params['productId'] : 0;
      if (this.updatedProductId)
        this.productService.getProduct(this.updatedProductId).subscribe(product => {
          this.productFormInfo.setValue(product)
        });
    })
  }

  get productName() {
    return this.productFormInfo.get('productName')
  }
  get liter() {
    return this.productFormInfo.get('liter')
  }
  get km() {
    return this.productFormInfo.get('km')
  }
  get numberOfUnits() {
    return this.productFormInfo.get('numberOfUnits')
  }
  get sae() {
    return this.productFormInfo.get('sae')
  }
  get api() {
    return this.productFormInfo.get('api')
  }
  get buyPrice() {
    return this.productFormInfo.get('buyPrice')
  }
  get sellingPrice() {
    return this.productFormInfo.get('sellingPrice')
  }

  onSubmit() {
    if (this.productFormInfo.valid) {
      if (this.updatedProductId) {
        this.productService.updateProduct(this.productFormInfo.value).subscribe(() => {
          this.redirectToProductList("تم تعديل المنتج بنجاح");
        });
      } else {
        this.productService.addProduct(this.productFormInfo.value).subscribe(() => {
          this.redirectToProductList("تم اضافة المنتج بنجاح");
        });
      }
    } else {
      this.isInValid = true;
      this.productFormInfo.markAllAsTouched();
    }
  }

  redirectToProductList(message: string) {
    this.snackBarService.showSnackBar(message);
    this.isInValid = false;
    this.router.navigate(["products/list"]);
  }

}
