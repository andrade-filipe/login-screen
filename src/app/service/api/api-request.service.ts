import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/app/app-config/app-config.interface';
import { APP_SERVICE_CONFIG } from 'src/app/app-config/app-config.service';
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

    registerUserRequest(registerThis: RegisterInput): Observable<void> {
        return this.http.post<void>(
            `${this.API_URL}/auth/register`,
            registerThis,
            this.httpOptionsNormal()
        );
    }

    loginUserRequest(loginInput: LoginInput): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(
            `${this.API_URL}/auth/login`,
            loginInput,
            this.httpOptionsNormal()
        );
    }

    confirmUserEmail(username: string): Observable<LoginResponse> {
        let url = `${this.API_URL}/auth/register/confirm?username=${username}`;
        return this.http.get<LoginResponse>(url, this.httpOptionsNormal());
    }

    getUserInformation(username: string, token: string): Observable<User> {
        let url = `${this.API_URL}/home/information?username=${username}`;
        return this.http.get<User>(url, this.httpOptionsWithToken(token));
    }
}
