import { Injectable } from "@angular/core";
import { LocalStorageService } from "src/app/config/local-storage.service";
import { HttpCleintService } from "../../shared.module/services/http.client.service";
import { UserAuthenticateModel } from "../models/user.authenticate.model";
import { UserLoginModel } from "../models/user.login.model";

@Injectable()
export class AuthenticationService {

    loggedInUser: UserAuthenticateModel = null;
    constructor(private localStorageService: LocalStorageService, private http: HttpCleintService<any>) { }

    login(userName: string, password: string) {
        return this.http.post("login", { userName: userName, password: password });
    }

    setLoggedInUser(loggedUserModel: UserLoginModel){
        this.loggedInUser = new UserAuthenticateModel(loggedUserModel.userName, true, loggedUserModel.role);
        this.localStorageService.setCurrentUser(this.loggedInUser);
    }

    logout() {
        this.loggedInUser = null;
    }
}