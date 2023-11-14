import { Gender } from '../enums/gender';

export interface RegisterInput {
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    gender?: Gender;
    birthDate?: Date | null;
}
