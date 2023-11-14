import { Injectable, Optional } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
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
            let userLogged = this.loginRequest(loginInput);
            if (this.checkIfLoginEmpty(userLogged)){
                let userLoggedLogin = userLogged.username?.valueOf() as string;
                let userLoggedToken = userLogged.token?.valueOf() as string;
                if (this.checkIfUndefined(userLoggedLogin) && this.checkIfUndefined(userLoggedToken)){
                    let user = this.getUserInformation(userLoggedLogin, userLoggedToken)
                    user.token = userLoggedToken;
                    localStorage.setItem('user', JSON.stringify(user));
                    this.userSubject.next(user);
                    resolve(user);
                }else{
                    throwError(() => new Error("login or password somehow is empty"))
                }
            } else {
                throwError(() => new Error("Invalid Login"))
            }
        });
    }

    logout() {
        let emptyUser: User = {};
        localStorage.removeItem('user');
        this.userSubject.next(emptyUser);
    }

    private loginRequest(loginInput: LoginInput): LoginResponse{
        let loginResponse: LoginResponse;
        this.apiService.loginUserRequest(loginInput).subscribe({
            next: response => loginResponse = response,
            error: (_err) => throwError(() => new Error("Login was not successful")),
            complete: () => {
                return loginResponse;
            }
        });
        return loginResponse = {}
    }

    private getUserInformation(username: string, token: string): User{
        let user: User;
        this.apiService.getUserInformation(username, token).subscribe({
            next: response => user = response,
            error: (_err) => throwError(() => new Error("Couldn't get user information")),
            complete: () => {
                this.router.navigate(['/home'])
                return user;
            }
        });
        return user = {}
    }

    private checkIfLoginEmpty(loginResponse: LoginResponse): boolean{
        let loginEmpty: LoginResponse = {};
        return !(loginResponse === loginEmpty);
    }

    private checkIfUndefined(text: string): boolean{
        return !(text === undefined);
    }
}
