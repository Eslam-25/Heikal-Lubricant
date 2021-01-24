import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { LineViewModel } from "../models/line-view.model";
import { LineService } from "../services/line.service";

@Injectable()
export class LinesResolveService implements Resolve<LineViewModel[]>{
    
    constructor(private lineService: LineService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<LineViewModel[]> {
        return this.lineService.getLines();
    }
}