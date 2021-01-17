import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { LocalStorageService } from "src/app/config/local-storage.service";
import { UserRole } from "../enums/roles.enum";
import { UserAuthenticateModel } from "../models/user.authenticate.model";
import { UserLoginModel } from "../models/user.login.model";

@Injectable()
export class AuthenticationService{

    constructor(private localStorageService: LocalStorageService){}

    loggedInUser: UserAuthenticateModel = null;
    users: UserLoginModel[] = [
        {userName: 'user', password: 'user' , role: UserRole.USER},
        {userName: 'staff', password: 'staff', role: UserRole.STAFF},
        {userName: 'admin', password: 'admin', role: UserRole.ADMIN}
    ];

    login(userName: string, password: string): Observable<UserAuthenticateModel>{
        const loggedUser = this.users.find(user => user.userName == userName && user.password == password);
        if(loggedUser){
            this.loggedInUser = new UserAuthenticateModel(loggedUser.userName, true, loggedUser.role);
            this.localStorageService.setCurrentUser(this.loggedInUser);
        }
        return of(this.loggedInUser);
    }

    logout(){
        this.loggedInUser = null;
    }
}