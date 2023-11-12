import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/app/app-config/app-config.interface';
import { APP_SERVICE_CONFIG } from 'src/app/app-config/app-config.service';
import { LoginResponse } from 'src/app/interfaces/login-response';
import { RegisterInput } from 'src/app/interfaces/register-input';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    readonly API_URL: string = `${this.config.apiUrl}/api/v1`;

    token!: string;

    httpOptionsAuth = {
        method: 'GET',
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.token}`,
        }),
    };

    httpOptions = {
        method: 'POST',
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    constructor(private http: HttpClient, @Inject(APP_SERVICE_CONFIG) private config: AppConfig) {}

    registerUserRequest(registerThis: RegisterInput) {
        return this.http.post<void>(
            `${this.API_URL}/auth/register`,
            registerThis,
            this.httpOptions
        );
    }
}
