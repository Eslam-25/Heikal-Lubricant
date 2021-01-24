export class ProductModel{
    constructor(
        public id: number,
        public productName: string,
        public isActive: boolean,
        public liter: number,
        public kileMeter: number,
        public numberOfUnit: number,
        public sae: string,
        public api: string,
        public buyPrice: number,
        public sellingPrice: number,
        public imagePath: string
    ){}
}