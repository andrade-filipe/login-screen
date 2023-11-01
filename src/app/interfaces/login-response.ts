import { UserRole } from "../enums/user-role"

export interface LoginResponse {
  name: string;
  userRole: UserRole;
  token: string;
}
