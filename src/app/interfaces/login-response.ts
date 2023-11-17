import { UserRole } from '../enums/user-role';

export interface LoginResponse {
    name: string;
    username: string;
    userRole: UserRole;
    token: string;
}
