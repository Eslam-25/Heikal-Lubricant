import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { ProductModel } from "../models/product.model";

@Injectable()
export class ProductService{

    products: ProductModel[] = [
        {id: 1 , productName: 'ازرق' ,api: '20w50',sae: '50' ,buyPrice: 100 ,isActive: true,km: 2000, liter: 20,numberOfUnits:1,sellingPrice: 150},
        {id: 2 , productName: 'اسود' ,api: '20w50',sae: '50' ,buyPrice: 100 ,isActive: true,km: 2000, liter: 20,numberOfUnits:1,sellingPrice: 150},
        {id: 3 , productName: 'توكتوك' ,api: '20w50',sae: '50' ,buyPrice: 100 ,isActive: true,km: 2000, liter: 20,numberOfUnits:1,sellingPrice: 150},
    ];

    constructor(){}

    addProduct(newProduct: ProductModel){
        newProduct.id = this.products.length + 1;
        newProduct.isActive = true;
        this.products.push(newProduct);
    }

    getProducts(){
        return of(this.products);
    }

    getProduct(id: number){
        const product= this.products.find(p => p.id == id);
        return of(product)
    }

    deleteProduct(id: number){
        const productIndex = this.products.findIndex(p => p.id == id);
        this.products.splice(productIndex, 1);
        return true;
    }

    updateProduct(updatedProduct: ProductModel){
        this.deleteProduct(updatedProduct.id);
        this.addProduct(updatedProduct);
    }
}