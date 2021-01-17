import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { LocalStorageService } from "src/app/config/local-storage.service";
import { UserAuthenticateModel } from "../../authentication.module/models/user.authenticate.model";

@Injectable()
export class CanActivateProductService implements CanActivate{
    
    currentUser: UserAuthenticateModel;
    constructor(private localStorageService: LocalStorageService, private router: Router){
        this.currentUser = localStorageService.getCurrentUser();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        if(this.currentUser)
            return true;
        
        this.router.navigate(['login'] , {queryParams: {returnUrl : state.url}});
        return false;
    }
}