import { Injectable } from "@angular/core";
import { HttpCleintService } from "../../shared.module/services/http.client.service";
import { ProductModel } from "../models/product.model";

@Injectable()
export class ProductService{
    constructor(private http: HttpCleintService<ProductModel>){}

    addProduct(newProduct: ProductModel){
        newProduct.imagePath = "iamgea";
        delete newProduct['creationDate'];
        delete newProduct.id;
        delete newProduct.isActive;
        return this.http.post("product", newProduct);
    }

    getProducts(){
        return this.http.get("product");
    }

    getProduct(id: number){
        return this.http.getById("product", id)
    }

    deleteProduct(deletedProduct: ProductModel){
        return this.http.delete("product", deletedProduct);
    }

    updateProduct(updatedProduct: ProductModel){
        return this.http.update("product", updatedProduct);
    }
}