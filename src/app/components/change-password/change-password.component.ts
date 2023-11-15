import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { ChangePasswordInput } from 'src/app/interfaces/change-password-input';
import { ApiService } from 'src/app/service/api/api-request.service';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
    constructor(
        private apiService: ApiService,
        private activatedRoute: ActivatedRoute,
        private route: Router
    ) {}

    ngOnInit(): void {
        this.activatedRoute.params.subscribe({
            next: (param) => {
                let usernameFromRoute = param['username'];
                this.changePasswordForm.value.username = usernameFromRoute;
            },
            error: (err) => throwError(() => new Error("Couldn't confirm email")),
        });
    }

    changePasswordForm = new FormGroup({
        username: new FormControl('', Validators.required),
        newPassword: new FormControl('', Validators.required),
        confirmNewPassword: new FormControl('', Validators.required),
    });

    onSubmit() {
        let usernameFromForm = this.changePasswordForm.value.username?.valueOf() as string;
        let newPasswordFromForm = this.changePasswordForm.value.newPassword?.valueOf() as string;
        let confirmNewPasswordFromForm = this.changePasswordForm.value.confirmNewPassword?.valueOf() as string;

        if (this.confirmPassword(newPasswordFromForm, confirmNewPasswordFromForm)) {
            let changePassword: ChangePasswordInput = {
                username: usernameFromForm,
                newPassword: newPasswordFromForm,
            };
            this.changePasswordOfUser(changePassword);
        }
    }

    private changePasswordOfUser(changePassword: ChangePasswordInput) {
        this.apiService.changePasswordRequest(changePassword).subscribe({
            error: (_err) => throwError(() => new Error("Couldn't change password")),
            complete: () => {this.route.navigate(['/login'])}
        });
    }

    private confirmPassword(newPassword: string, confirmNewPassword: string): boolean {
        if (
            ((newPassword == '') == null) == undefined ||
            ((confirmNewPassword == '') == null) == undefined
        ) {
            return false;
        }
        return newPassword === confirmNewPassword;
    }
}
