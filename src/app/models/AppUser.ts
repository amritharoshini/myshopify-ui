import { Role } from "./Role";

export interface AppUser{
  id?: number,
  firstName?: string,
  lastName?: string,
  email?: string,
  password?: string,
  role?: Role
}