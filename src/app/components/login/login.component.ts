import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUser } from 'src/app/models/AppUser';
import { AuthResponse } from 'src/app/models/AuthResponse';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  errorMessage !: string

  user: AppUser = {
    email: '',
    password: ''
  }

  constructor(private userService: UserService, private auth: AuthService,
     private router: Router, private route: ActivatedRoute){}

  login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/'
    localStorage.setItem('returnUrl', returnUrl)

    this.userService.login(this.user).subscribe({
      next: (response:AuthResponse) => {
        this.auth.setToken(response.token)
        this.userService.setUser(response.user)
        this.auth.setRole(response.user.role)

        this.router.navigateByUrl(returnUrl);
      }, 
      error: (err:HttpErrorResponse) => {
        if(err.status == 403){
          this.errorMessage = "Invalid Credentials"
        }
      }
    })
  }

}
