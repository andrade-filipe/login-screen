import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api/api-request.service';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
    constructor(apiService: ApiService) {}

    loginForm = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
    });

    onSubmit() {
        console.warn(this.loginForm.value);
    }

    register() {}
}
