import { Injectable, Optional } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { LoginInput } from 'src/app/interfaces/login-input';
import { User } from 'src/app/interfaces/user';
import { ApiService } from '../api/api-request.service';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/interfaces/login-response';
import { UserRole } from 'src/app/enums/user-role';
import { Check } from '../validations/check';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    constructor(private apiService: ApiService, private router: Router) {
    }

     login(loginInput: LoginInput) {
        //TODO: REQUISIÇÃO DE LOGIN PARA API RETORNANDO LOGINRESPONSE
        //TODO: REDIRECIONAR USUÁRIO A PARTIR DA ROLE EM LOGINRESPONSE
        //TODO: SALVAR USUÁRIO EM LOCALSTORAGE

    }

    autoLogin(confirmedUser: LoginResponse) {
        // TODO: REDIRECIONAR USUÁRIO A PARTIR DA ROLE EM LOGINRESPONSE
        // TODO: SALVAR USUÁRIO EM LOCALSTORAGE
    }

    logout() {
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
    }

    private redirectUser(role: UserRole){
        if(role === UserRole.ADMIN ){
            this.router.navigate(['/admin']);
        } else if (role === UserRole.USER){
            this.router.navigate(['/home']);
        } else {
            console.log(role);
            throwError(() => new Error('User role is invalid'));
        }
    }
}
