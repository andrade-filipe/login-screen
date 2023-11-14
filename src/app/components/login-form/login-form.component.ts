import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginInput } from 'src/app/interfaces/login-input';
import { ApiService } from 'src/app/service/api/api-request.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
    constructor(apiService: ApiService, private userService: UserService) {}

    loginForm = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
    });

    onSubmit() {
        const username = this.loginForm.value.username?.valueOf() as string;
        const password = this.loginForm.value.password?.valueOf() as string;
        if(this.checkIfUndefined(username, password)){
            let loginInput: LoginInput = {
                login: username,
                password: password,
            }
            this.userService.login(loginInput)
        } else{
            throw new Error("username or password is not being registered")
        }
    }

    private checkIfUndefined(login: string, password: string){
        return !(login === undefined) && !(password === undefined);
    }
}
