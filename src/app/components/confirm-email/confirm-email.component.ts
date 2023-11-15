import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../service/api/api-request.service';
import { throwError } from 'rxjs';
import { UserService } from '../../service/user/user.service';
import { LoginResponse } from '../../interfaces/login-response';

@Component({
    selector: 'app-confirm-email',
    templateUrl: './confirm-email.component.html',
    styleUrls: ['./confirm-email.component.css'],
})
export class ConfirmEmailComponent implements OnInit {
    constructor(
        private apiService: ApiService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.activatedRoute.params.subscribe({
            next: (param) => {
                let username = param['username'];
                this.confirmUser(username);
            },
            error: (err) => throwError(() => new Error("Couldn't confirm email")),
        });
    }

    private confirmUser(username: string) {
        let confirmedUser: LoginResponse;
        this.apiService.confirmUserEmail(username).subscribe({
            next: (response) => {
                confirmedUser = response;
            },
            error: (err) => throwError(() => new Error("Couldn't confirm email")),
            complete: () => {
                this.autoLoginAfterConfirmEmail(confirmedUser);
            },
        });
    }

    private autoLoginAfterConfirmEmail(confirmedUser: LoginResponse) {
        this.userService.autoLogin(confirmedUser);
    }
}
