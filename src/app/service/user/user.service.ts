import { Injectable, Optional } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor() {
        this.userSubject = new BehaviorSubject<User>(Optional());
        this.user = this.userSubject.asObservable();
    }

    login(username: string, password: string) {
        return new Promise((resolve, reject) => {
            // Here you would typically send a request to your backend API to authenticate the user
            // For this example, we'll just simulate a successful login
            const user: User = {};
            user.username = username;
            user.token = 'fake-jwt-token';
            localStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
            resolve(user);
        });
    }


    logout() {
        let emptyUser: User = {};
        localStorage.removeItem('user');
        this.userSubject.next(emptyUser);
    }
}
