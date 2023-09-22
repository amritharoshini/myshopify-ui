import { AppUser } from "./AppUser"

export interface AuthResponse{
  user: AppUser
  token: string
}