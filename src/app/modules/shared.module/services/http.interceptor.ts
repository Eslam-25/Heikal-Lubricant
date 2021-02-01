import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { EMPTY, Observable } from "rxjs";
import { map } from "rxjs/operators";

export class HttpClientInterceptor implements HttpInterceptor{

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log(req)
        // return EMPTY;

        return next.handle(req).pipe(map(response => {

            
            // if (response instanceof HttpResponse) {
            //     response = response.clone<any>({body: response.body.splice(1,1)})
            // }

            return response;
        }));
    }

}