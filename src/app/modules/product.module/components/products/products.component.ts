import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ProductModel } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { DeleteDialogComponent } from '../../../shared.module/components/delete-dialog/delete-dialog.component';
import { SnackBarServie } from 'src/app/modules/shared.module/components/snack-bar/snack-bar.service';
import { LocalStorageService } from 'src/app/config/local-storage.service';
import { UserAuthenticateModel } from 'src/app/modules/authentication.module/models/user.authenticate.model';
import { UserRole } from 'src/app/modules/authentication.module/enums/roles.enum';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  displayedColumns: string[] = ['sae', 'api', 'kileMeter', 'liter', 'sellingPrice', 'productName', 'id'];
  products: ProductModel[] = [];
  currentUser: UserAuthenticateModel;

  constructor(
    private productService: ProductService,
    private snackBarService: SnackBarServie,
    private localStorageService: LocalStorageService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.preparePermission();
    this.prepareProducts();
  }

  prepareProducts() {
    this.productService.getProducts().subscribe(result => {
      this.products = result.filter(prod => prod.isActive);
    });
  }

  preparePermission() {
    this.currentUser = this.localStorageService.getCurrentUser();
    if (this.currentUser.role == UserRole.ADMIN)
      this.displayedColumns.splice(0, 0, ...['detail', 'delete', 'edit']);
    else
      this.displayedColumns.splice(0, 0, ...['detail']);
  }

  openDeleteDialog(deletedProduct: ProductModel) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        deletedItem: {
          dialogTitle: "حذف منتج",
          dialogMessage: `هل تريد حذف المنتج ${deletedProduct.productName} ؟`
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == "deleted")
        this.deleteProduct(deletedProduct);
    })
  }

  deleteProduct(deletedProduct: ProductModel) {
    this.productService.deleteProduct(deletedProduct).subscribe(result => {
        this.prepareProducts();
        this.snackBarService.showSnackBar("تم حذف المنتج بنجاح");
    });
  }

}
