import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppUser } from '../models/AppUser';
import { AuthResponse } from '../models/AuthResponse';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '../models/Role';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  setRole(role:Role){
    localStorage.setItem("role", role)
  }

  setToken(token:string){
    localStorage.setItem("token", token)
  }

  getRole(){
    return localStorage.getItem('role')
  }

  getToken(){
    return localStorage.getItem('token')
  }

  isLoggedIn():boolean{
    return this.getRole() !== null && this.getToken() !== null 
  }

  isAdmin():boolean{
    return this.getRole() == Role.ADMIN && this.getToken() != null
  }

  clear(){
    localStorage.clear()
  }
  
}
