import { Injectable, Optional } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { LoginInput } from 'src/app/interfaces/login-input';
import { User } from 'src/app/interfaces/user';
import { ApiService } from '../api/api-request.service';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/interfaces/login-response';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(private apiService: ApiService, private router: Router) {
        this.userSubject = new BehaviorSubject<User>(Optional());
        this.user = this.userSubject.asObservable();
    }

    login(loginInput: LoginInput) {
        return new Promise((resolve, reject) => {
            this.loginRequest(loginInput).then((userLogged => {
                if (this.checkIfLoginEmpty(userLogged)){
                    let userLoggedLogin = userLogged.username?.valueOf() as string;
                    let userLoggedToken = userLogged.token?.valueOf() as string;
                    if (this.checkIfUndefined(userLoggedLogin) && this.checkIfUndefined(userLoggedToken)){
                        this.getUserInformation(userLoggedLogin, userLoggedToken).then((user => {
                            user.token = userLoggedToken;
                            localStorage.setItem('user', JSON.stringify(user));
                            this.userSubject.next(user);
                            resolve(user);

                        }));
                    }else{
                        reject(new Error("login or password somehow is empty"));
                    }
                } else {
                    reject(new Error("Invalid Login"));
                }
            }));
        });
    }

    logout() {
        let emptyUser: User = {};
        localStorage.removeItem('user');
        this.userSubject.next(emptyUser);
    }

    private loginRequest(loginInput: LoginInput): Promise<LoginResponse>{
        return new Promise((resolve, reject) => {
            this.apiService.loginUserRequest(loginInput).subscribe({
                next: response => resolve(response),
                error: (_err) => reject(new Error("Invalid login"))
            });
        });
    }

    private getUserInformation(username: string, token: string): Promise<User>{
        return new Promise((resolve, reject) => {
            this.apiService.getUserInformation(username, token).subscribe({
                next: response => {
                    resolve(response)
                    this.router.navigate(['/home']);
                },
                error: (_err) => throwError(() => new Error("Couldn't get user information")),
            });
        })
    }

    private checkIfLoginEmpty(loginResponse: LoginResponse): boolean{
        let loginEmpty: LoginResponse = {};
        return !(loginResponse === loginEmpty);
    }

    private checkIfUndefined(text: string): boolean{
        return !(text === undefined);
    }
}
