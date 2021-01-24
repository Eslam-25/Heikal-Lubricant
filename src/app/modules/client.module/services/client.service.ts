import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { HttpCleintService } from "../../shared.module/services/http.client.service";
import { ClientModel } from "../models/client.model";

@Injectable()
export class ClientServie{
    urlSegment = "client";
    constructor(private http: HttpCleintService<any>){}

    getClients(){
        return this.http.get(this.urlSegment);
    }

    add(newClient){
        delete newClient.id;
        delete newClient.isActive;
        delete newClient.dayName;
        return this.http.post(this.urlSegment , newClient);
    }

    getClient(id: number){
        return this.http.getById(this.urlSegment , id);
    }

    remove(deletedItem){
        var deletedClient: ClientModel = new ClientModel(
            deletedItem.id, 
            deletedItem.clientName, 
            deletedItem.phoneNumber, 
            deletedItem.address , 
            deletedItem.line.id,
            deletedItem.isActive);     
        return this.http.delete(this.urlSegment , deletedClient);
    }

    update(updatedClient){
        delete updatedClient.dayName;
        return this.http.update(this.urlSegment , updatedClient);
    }

}