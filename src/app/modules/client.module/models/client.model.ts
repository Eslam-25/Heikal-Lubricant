export class ClientModel {
    constructor(
        public id: number, 
        public clientName: string, 
        public phoneNumber: string, 
        public address: string, 
        public dayName: string, 
        public lineName: string, 
        public isActive: boolean
    ) { }
}