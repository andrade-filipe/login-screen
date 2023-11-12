import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AppConfig } from 'src/app/app-config/app-config.interface';
import { APP_SERVICE_CONFIG } from 'src/app/app-config/app-config.service';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    readonly API_URL: string = `${this.config.apiUrl}/api/v1`;

    token: string = '';

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
        }),
    };

    constructor(
        private http: HttpClient,
        @Inject(APP_SERVICE_CONFIG) private config: AppConfig) {}
}
