import { Injectable, Output } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, catchError, retry, throwError, timer } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiException } from '../interfaces/api-exception';

@Injectable()
export class GlobalHttpErrorHandlerInterceptor implements HttpInterceptor {
    constructor(private snackbar: MatSnackBar) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError((err: Error) => {
                return throwError(() => {
                    this.snackbar.open(err.name, 'OK')
                    return err
                });
            }),
            retry({
                count: 3,
                delay: (_, retryCount) => timer(retryCount * 0),
            })
        );
    }
}
