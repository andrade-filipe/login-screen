import { Gender } from '../enums/gender';
import { UserRole } from '../enums/user-role';

export interface User {
    name?: string;
    username?: string;
    email?: string;
    gender?: Gender;
    birthDate?: Date;
    userRole?: UserRole;
    token?: string;
}
