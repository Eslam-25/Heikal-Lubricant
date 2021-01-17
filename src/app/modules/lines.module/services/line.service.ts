import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { LineModel } from "../models/line.model";
import { delay } from 'rxjs/internal/operators';

@Injectable()
export class LineService{
    constructor(){}

    lines: LineModel[] = [
        {dayName: 'السبت' , id: 1 , lineName: 'محلة دمنة',isActive: true },
        {dayName: 'السبت' , id: 2 , lineName: 'دكرنس', isActive: false},
        {dayName: 'الخميس' , id: 3 , lineName: 'الزرقا', isActive: true}
    ];

    getLines(): Observable<LineModel[]>{
        return of(this.lines).pipe(delay(1500));
    }

    getLine(id: number): Observable<LineModel>{
        const result = this.lines.find(l => l.id === id);
        return of(result);
    }

    add(newLine: LineModel){
        newLine.id = this.lines.length + 1;
        newLine.isActive = true;
        this.lines.push(newLine);
    }

    remove(id: number): boolean{
        const lineIndex = this.lines.findIndex(l => l.id === id);
        this.lines[lineIndex].isActive = false;
        return true;
    }

    update(updateLine: LineModel){
        this.remove(updateLine.id);
        this.add(updateLine);
    }

    daysOfWeek(){
        return ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'];
    }
}