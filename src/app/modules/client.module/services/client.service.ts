import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { ClientModel } from "../models/client.model";

@Injectable()
export class ClientServie{

    clients: ClientModel[] = [
        {id: 1,clientName: 'احمد', address: 'Mansoura',isActive: true,phoneNumber: '123' , dayName: 'السبت',lineName: 'محلة دمنة'},
        {id: 2,clientName: 'احمد', address: 'Mansoura',isActive: true,phoneNumber: '123' , dayName: 'الاحد',lineName: 'محلة دمنة'},
        {id: 3,clientName: 'احمد', address: 'Mansoura',isActive: true,phoneNumber: '123' , dayName: 'الاربع',lineName: 'محلة دمنة'},
        {id: 4,clientName: 'احمد', address: 'Mansoura',isActive: true,phoneNumber: '123' , dayName: 'الجمعة',lineName: 'محلة دمنة'},
    ];

    constructor(){}

    getClients(){
        return of(this.clients);
    }

    add(newClient: ClientModel){
        newClient.id = this.clients.length + 1;
        newClient.isActive = true;
        this.clients.push(newClient);
    }

    getClient(id: number){
        return of(this.clients.find(c => c.id == id));
    }

    remove(id: number){
        const clientIndex = this.clients.findIndex(c => c.id == id);
        this.clients[clientIndex].isActive = false;
        return true;
    }

    update(updatedClient: ClientModel){
        this.remove(updatedClient.id);
        this.add(updatedClient)
    }

}