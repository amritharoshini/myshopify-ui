import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppUser } from '../models/AppUser';
import { RegisterResponse } from '../models/RegisterResponse';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthResponse } from '../models/AuthResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject: BehaviorSubject<AppUser> = new BehaviorSubject<AppUser>(null)
  public user$: Observable<AppUser> = this.userSubject.asObservable()

  private USER_SERVICE_API = 'http://localhost:8081/api/auth'

  constructor(private http: HttpClient) { }

  register(user: AppUser): Observable<RegisterResponse>{
    return this.http.post<RegisterResponse>(this.USER_SERVICE_API + '/register', user, {headers: { 'No-Auth': 'True'}})
  }

  login(user:AppUser){
    return this.http.post<AuthResponse>(this.USER_SERVICE_API + '/authenticate', user, {headers: { 'No-Auth': 'True'}})
  }

  setUser(user:AppUser){
    this.userSubject.next(user)
  }

  clearUser(){
    this.userSubject.next(null)
  }

}
