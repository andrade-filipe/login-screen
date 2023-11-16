import { Injectable, Optional } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { LoginInput } from 'src/app/interfaces/login-input';
import { User } from 'src/app/interfaces/user';
import { ApiService } from '../api/api-request.service';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/interfaces/login-response';
import { UserRole } from 'src/app/enums/user-role';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(private apiService: ApiService, private router: Router) {
        this.userSubject = new BehaviorSubject<User>({});
        this.user = this.userSubject.asObservable();
    }

    login(loginInput: LoginInput) {
        return new Promise((resolve, reject) => {
            this.loginRequestPromise(loginInput).then((userLogged) => {
                if (this.checkIfLoginEmpty(userLogged)) {
                    let userLoggedLogin = userLogged.username?.valueOf() as string;
                    let userLoggedToken = userLogged.token?.valueOf() as string;
                    if (
                        this.checkIfUndefined(userLoggedLogin) &&
                        this.checkIfUndefined(userLoggedToken)
                    ) {
                        this.getUserInformationPromise(userLoggedLogin, userLoggedToken).then(
                            (user) => {
                                user.token = userLoggedToken;
                                this.userSubject.next(user);
                                localStorage.setItem('user', JSON.stringify(user));
                                resolve(user);
                            }
                        );
                    } else {
                        reject(new Error('login or password somehow is empty'));
                    }
                } else {
                    reject(new Error('Invalid Login'));
                }
            });
        });
    }

    autoLogin(confirmedUser: LoginResponse) {
        return new Promise((resolve, reject) => {
            let username = confirmedUser.username?.valueOf() as string;
            let token = confirmedUser.token?.valueOf() as string;
            this.getUserInformationPromise(username, token).then((user) => {
                user.token = token;
                this.userSubject.next(user);
                localStorage.setItem('user', JSON.stringify(user));
                resolve(user);
            });
        });
    }

    logout() {
        let emptyUser: User = {};
        localStorage.removeItem('user');
        this.userSubject.next(emptyUser);
        this.router.navigate(['/login']);
    }

    private loginRequestPromise(loginInput: LoginInput): Promise<LoginResponse> {
        return new Promise((resolve, reject) => {
            this.apiService.loginUserRequest(loginInput).subscribe({
                next: (response) => resolve(response),
                error: (_err) => reject(new Error('Invalid login')),
            });
        });
    }

    private getUserInformationPromise(username: string, token: string): Promise<User> {
        return new Promise((resolve, reject) => {
            this.apiService.getUserInformation(username, token).subscribe({
                next: (response) => resolve(response),
                error: (_err) => reject(new Error("Couldn't get user information")),
            });
        });
    }

    private checkIfLoginEmpty(loginResponse: LoginResponse): boolean {
        let loginEmpty: LoginResponse = {};
        return !(loginResponse === loginEmpty);
    }

    private checkIfUndefined(text: string): boolean {
        return !(text === undefined);
    }

    private routerNavigation(): void {
        let userRoleString!: string;

        this.user.pipe(
            map((response) => {
                userRoleString = response.userRole?.valueOf() as string;
            }),
            catchError(() => throwError(() => new Error('router error')))
        );
        console.log(userRoleString);
        if (userRoleString == 'ADMIN') {
            this.router.navigate(['/admin']);
        } else if (userRoleString == 'USER') {
            this.router.navigate(['/home']);
        } else {
            throwError(() => new Error('Something went wrong with user role'));
        }
    }
}
