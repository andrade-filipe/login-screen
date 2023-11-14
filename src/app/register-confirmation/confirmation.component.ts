import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api/api-request.service';
import { throwError } from 'rxjs';
import { UserService } from '../service/user/user.service';
import { LoginResponse } from '../interfaces/login-response';

@Component({
  selector: 'app-register-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

    constructor(
        private apiService: ApiService,
        private userService: UserService,
        private route: ActivatedRoute){}

    ngOnInit(): void {
        this.route.params.subscribe({
            next: param => {
                let username = param['username'];
                this.confirmUser(username);
            },
            error: (err) => throwError(() => new Error("Couldn't confirm email"))
        });
    }

    confirmUser(username: string) {
        let confirmedUser: LoginResponse;
        this.apiService.confirmUserEmail(username).subscribe({
            next: response => {
                confirmedUser = response;
            },
            error: (err) => throwError(() => new Error("Couldn't confirm email")),
            complete: () => {
                this.autoLoginAfterConfirmEmail(confirmedUser);
            }
        });
    }

    autoLoginAfterConfirmEmail(confirmedUser: LoginResponse){
        this.userService.autoLogin(confirmedUser);
    }
}
