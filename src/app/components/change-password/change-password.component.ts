import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { ApiService } from 'src/app/service/api/api-request.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit{

    constructor(
        private apiService: ApiService,
        private activatedRoute: ActivatedRoute,
        private route: Router
    ) {}

    ngOnInit(): void {
        this.activatedRoute.params.subscribe({
            next: (param) => {
                let username = param['username'];
                this.changePasswordOfUser(username);
            },
            error: (err) => throwError(() => new Error("Couldn't confirm email")),
        });
    }

    changePasswordOfUser(username: string) {
        throw new Error('Method not implemented.');
    }
}
