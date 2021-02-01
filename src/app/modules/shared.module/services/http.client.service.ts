import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable()
export class HttpCleintService<T>{

    baseUrl = environment.applicationAPI;
    constructor(private http: HttpClient){}

    post(url:string, element: T){
        return this.http.post(this.baseUrl + url, element);
    }

    get(url:string){
        return this.http.get<T[]>(this.baseUrl + url)
    }

    getById(url:string, id: number){
        return this.http.get<T>(`${this.baseUrl + url}/` + id)
    }

    delete(url:string, deletedElement: T){
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }), 
            body: deletedElement
        };
        return this.http.delete(this.baseUrl+ url, httpOptions);
    }

    update(url:string, updatedElement: T){
        return this.http.put(this.baseUrl+ url, updatedElement);
    }
}