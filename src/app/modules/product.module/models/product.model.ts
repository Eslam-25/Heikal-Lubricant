export class ProductModel{
    constructor(
        public id: number,
        public productName: string,
        public isActive: boolean,
        public liter: number,
        public km: number,
        public numberOfUnits,
        public sae: string,
        public api: string,
        public buyPrice: number,
        public sellingPrice: number
    ){}
}