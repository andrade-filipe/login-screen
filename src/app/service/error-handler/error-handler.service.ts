import { ErrorHandler, Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler{

    constructor(private zone: NgZone) { }

    handleError(error: unknown){
        this.zone.run(() => {
            if(error instanceof Error){
                console.warn(error);
            } else {
                console.error("System Failed");
            }
        })
    }
}
