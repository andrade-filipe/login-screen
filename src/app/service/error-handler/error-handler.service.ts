import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBar } from '@angular/material/snack-bar';
import { ErrorHandler, Inject, Injectable, NgZone } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {
    constructor(
        private zone: NgZone,
        private snackbar: MatSnackBar) {}

    handleError(error: unknown) {
        this.zone.run(() => {
            if (error instanceof Error) {
                this.snackbar.open(error.message, 'ok');
            } else {
                this.snackbar.open("system failed", ':(');
            }
        });
    }
}
