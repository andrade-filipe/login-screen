import { Injectable, Optional } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { LoginInput } from 'src/app/interfaces/login-input';
import { User } from 'src/app/interfaces/user';
import { ApiService } from '../api/api-request.service';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/interfaces/login-response';
import { UserRole } from 'src/app/enums/user-role';
import { Check } from '../validations/check';
import { UserObject } from 'src/app/interfaces/user-class';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private apiService: ApiService, private router: Router) {}

    public async login(loginInput: LoginInput) {
        this.performLoginRequest(loginInput);
    }

    autoLogin(confirmedUser: LoginResponse) {
        this.getUserAndSaveToLocalStorage(confirmedUser);
    }

    logout() {
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
    }

    private async performLoginRequest(loginInput: LoginInput) {
        let promise = await new Promise<LoginResponse>((resolve, reject) => {
            this.apiService
                .loginUserRequest(loginInput)
                .pipe(
                    map((response) => {
                        resolve(response);
                    })
                )
                .subscribe();
        });
        this.getUserAndSaveToLocalStorage(promise);
    }

    private async getUserAndSaveToLocalStorage(loginResponse: LoginResponse) {
        let promise = await new Promise<User>((resolve, reject) => {
            this.apiService
                .getUserInformation(loginResponse.username, loginResponse.token)
                .pipe(
                    map((response) => {
                        resolve(response);
                    })
                )
                .subscribe();
        });
        let userObject = this.mapUserObject(promise);
        userObject.setToken(loginResponse.token);
        this.saveToLocalStorage(userObject);
    }

    private saveToLocalStorage(user: UserObject) {
        this.redirectUser(user.getUserRole());
        localStorage.setItem('user', JSON.stringify(user));
    }

    private redirectUser(role: UserRole) {
        if (role.match(UserRole.ADMIN)) {
            this.router.navigate(['/admin']);
        } else if (role.match(UserRole.USER)) {
            this.router.navigate(['/home']);
        } else {
            console.log(role);
            throwError(() => new Error('User role is invalid'));
        }
    }

    private mapUserObject(user: User): UserObject {
        return new UserObject(
            user.name,
            user.username,
            user.email,
            user.gender,
            user.birthDate,
            user.role,
            user.token
        );
    }
}
