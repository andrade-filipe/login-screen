import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { ForgotPassword } from 'src/app/interfaces/forgot-password';
import { ApiService } from 'src/app/service/api/api-request.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
    constructor(private apiService: ApiService, private router: Router) {}

    forgotPasswordForm = new FormGroup({
        email: new FormControl('', Validators.required),
    });

    onSubmit() {
        let forgotPassword: ForgotPassword = {
            email: this.forgotPasswordForm.value.email?.valueOf() as string,
        };
        this.sendForgotPasswordRequest(forgotPassword);
    }

    private sendForgotPasswordRequest(forgotPassword: ForgotPassword) {
        this.apiService.forgotPasswordRequest(forgotPassword).subscribe({
            error: (err) => throwError(() => new Error("Couldn't send forgot-password request")),
            complete: () => {
                this.router.navigate(['/login']);
            },
        });
    }
}
