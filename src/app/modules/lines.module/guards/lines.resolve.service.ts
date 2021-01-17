import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { LineModel } from "../models/line.model";
import { LineService } from "../services/line.service";

@Injectable()
export class LinesResolveService implements Resolve<LineModel[]>{
    
    constructor(private lineService: LineService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<LineModel[]> {
        return this.lineService.getLines();
    }
}