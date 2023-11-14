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

    private token !: string | undefined;

    httpOptionsWithToken = {
        method: 'GET',
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`,
        }),
    };

    httpOptions = {
        method: 'POST',
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    constructor(private http: HttpClient, @Inject(APP_SERVICE_CONFIG) private config: AppConfig) {}

    registerUserRequest(registerThis: RegisterInput): Observable<void> {
        return this.http.post<void>(
            `${this.API_URL}/auth/register`,
            registerThis,
            this.httpOptions
        );
    }

    loginUserRequest(loginInput: LoginInput): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(
            `${this.API_URL}/auth/login`,
            loginInput,
            this.httpOptions
        )
    }

    getUserInformation(username: string, token: string): Observable<User> {
        let url = `${this.API_URL}/home/information?username=${username}`
        this.token = token;
        return this.http.get<User>(url, this.httpOptionsWithToken);
    }
}
