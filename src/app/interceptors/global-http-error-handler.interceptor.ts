import { Injectable, Output } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, catchError, retry, throwError, timer } from 'rxjs';

@Injectable()
export class GlobalHttpErrorHandlerInterceptor implements HttpInterceptor {
    //TODO: mostrar as exceções lançadas para o usuário
    //@Output errorEmitter
    constructor() {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError((err) => {
                return throwError(() => {
                    console.log(err);
                    return err;
                });
            }),
            retry({
                count: 3,
                delay: (_, retryCount) => timer(retryCount * 100),
            })
        );
    }
}
