import { Gender } from "../enums/gender";

export interface Register {
  name: string;
  username: string;
  email: string;
  password: string;
  gender: Gender;
  birthDate: Date;
}
