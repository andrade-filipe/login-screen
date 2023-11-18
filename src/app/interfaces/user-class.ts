import { Gender } from '../enums/gender';
import { UserRole } from '../enums/user-role';

export class UserObject {
    name!: string;
    username!: string;
    email!: string;
    gender!: Gender;
    birthDate!: Date;
    role!: UserRole;
    token!: string;

    constructor(
        name: string,
        username: string,
        email: string,
        gender: Gender,
        birthDate: Date,
        role: UserRole,
        token: string
    ) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.gender = gender;
        this.birthDate = birthDate;
        this.role = role;
        this.token = token;
    }

    getUserRole() {
        return this.role;
    }

    setToken(token: string) {
        this.token = token;
    }
}
