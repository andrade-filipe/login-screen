import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AppConfig } from 'src/app/app-config/app-config.interface';
import { APP_SERVICE_CONFIG } from 'src/app/app-config/app-config.service';
import { ApiException } from 'src/app/interfaces/api-exception';
import { ChangePasswordInput } from 'src/app/interfaces/change-password-input';
import { ForgotPassword } from 'src/app/interfaces/forgot-password';
import { LoginInput } from 'src/app/interfaces/login-input';
import { LoginResponse } from 'src/app/interfaces/login-response';
import { RegisterInput } from 'src/app/interfaces/register-input';
import { User } from 'src/app/interfaces/user';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    readonly API_URL: string = `${this.config.apiUrl}/api/v1`;

    private httpOptionsWithToken(token: string) {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            }),
        };
    }

    private httpOptionsNormal() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }),
        };
    }

    constructor(private http: HttpClient, @Inject(APP_SERVICE_CONFIG) private config: AppConfig) {}

    public registerUserRequest(registerThis: RegisterInput): Observable<void> {
        let url = `${this.API_URL}/auth/register`;
        return this.http.post<void>(url, registerThis, this.httpOptionsNormal());
    }

    public loginUserRequest(loginInput: LoginInput): Observable<LoginResponse> {
        let url = `${this.API_URL}/auth/login`;
        return this.http.post<LoginResponse>(url, loginInput, this.httpOptionsNormal());
    }

    public confirmUserEmail(username: string): Observable<LoginResponse> {
        let url = `${this.API_URL}/auth/register/confirm?username=${username}`;
        return this.http.get<LoginResponse>(url, this.httpOptionsNormal());
    }

    public forgotPasswordRequest(forgotPassword: ForgotPassword): Observable<void> {
        let url = `${this.API_URL}/auth/forgot-password`;
        return this.http.post<void>(url, forgotPassword, this.httpOptionsNormal());
    }

    public changePasswordRequest(changePassword: ChangePasswordInput): Observable<void>{
        let url = `${this.API_URL}/auth/change-password`;
        return this.http.post<void>(url, changePassword, this.httpOptionsNormal());
    }

    public getUserInformation(username: string, token: string): Observable<User> {
        let url = `${this.API_URL}/home/information?username=${username}`;
        return this.http.get<User>(url, this.httpOptionsWithToken(token));
    }
}
