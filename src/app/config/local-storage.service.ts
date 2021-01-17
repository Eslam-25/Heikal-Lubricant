import { Injectable } from "@angular/core";
import { UserAuthenticateModel } from "../modules/authentication.module/models/user.authenticate.model";

@Injectable()
export class LocalStorageService{
    constructor(){}

    setCurrentUser(currentUser: UserAuthenticateModel){
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }

    getCurrentUser(): UserAuthenticateModel{
        const currentUser = localStorage.getItem('currentUser');
        return JSON.parse(currentUser);
    }

    removeCurrentUser(){
        localStorage.removeItem('currentUser');
    }
}