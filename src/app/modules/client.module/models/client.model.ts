export class ClientModel {
    constructor(
        public id: number, 
        public clientName: string, 
        public phoneNumber: string, 
        public address: string, 
        public lineId: number, 
        public isActive: boolean
    ) { }
}