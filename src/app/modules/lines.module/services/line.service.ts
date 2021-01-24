import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { LineViewModel } from "../models/line-view.model";
import { HttpCleintService } from "../../shared.module/services/http.client.service";
import { LineModel } from "../models/line.model";

@Injectable()
export class LineService{
    
    urlSegment: string = "line";
    constructor(private http: HttpCleintService<any>){}

    lines: LineViewModel[] = [
        {dayName: 'السبت' , id: 1 , lineName: 'محلة دمنة',isActive: true },
        {dayName: 'السبت' , id: 2 , lineName: 'دكرنس', isActive: false},
        {dayName: 'الخميس' , id: 3 , lineName: 'الزرقا', isActive: true}
    ];

    getLines(): Observable<LineViewModel[]>{
        return this.http.get(this.urlSegment);
    }

    getLine(id: number): Observable<LineViewModel>{
        const result = this.lines.find(l => l.id === id);
        return of(result);
    }

    add(newLine: LineModel){
        return this.http.post(this.urlSegment , newLine);
    }

    remove(deletedLine: LineModel){
        return this.http.delete(this.urlSegment , deletedLine);
    }

    update(updateLine: LineModel){
        return this.http.update(this.urlSegment , updateLine);
    }

    daysOfWeek(){
        return this.http.get('day');
    }
}