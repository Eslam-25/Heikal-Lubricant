import { Injectable } from "@angular/core";
import { HttpCleintService } from "../../shared.module/services/http.client.service";

@Injectable()
export class UserService{

    urlSegment: string = "user";
    constructor(private http: HttpCleintService<any>){}

    getUsers(){
        return this.http.get(this.urlSegment);
    }

    getUser(userId: number){
        return this.http.getById(this.urlSegment, userId);
    }

    deleteUser(deletedUser){
        return this.http.delete(this.urlSegment ,deletedUser);
    }

    updateUser(updatedUser){
        return this.http.update(this.urlSegment ,updatedUser);
    }

    getRoles(){
        return this.http.get("role");
    }

    addUser(newUser){
        return this.http.post(this.urlSegment, newUser);
    }

}