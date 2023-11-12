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

    logout() {
        // Remove user from local storage and update logged in user
        let emptyUser: User = {};
        localStorage.removeItem('user');
        this.userSubject.next(emptyUser);
    }
}
