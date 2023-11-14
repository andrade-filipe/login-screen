import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api/api-request.service';
import { throwError } from 'rxjs';
import { UserService } from '../service/user/user.service';

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
        this.route.params.subscribe(params => {
            const username = params['username'];
            this.confirmUser(username);
        });
    }

    confirmUser(username: string) {
        let token !: string;
        this.apiService.confirmUserEmail(username).subscribe({
            next: response => {
                token = response.token as string;
            },
            error: (err) => throwError(() => new Error("Couldn't confirm email")),
            complete: () => {
                this.autoLoginAfterConfirmEmail(username, token);
            }
        });
    }

    autoLoginAfterConfirmEmail(username: string, token: string){
        this.userService.autoLogin(username, token);
    }
}
