import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppUser } from 'src/app/models/AppUser';
import { RegisterResponse } from 'src/app/models/RegisterResponse';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  successMessage!: any
  errorMessage!: any

  user: AppUser = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }

  constructor(private userService: UserService, private router: Router){}

  register(){
    console.log(this.user)
    this.userService.register(this.user).subscribe({
      next: (response: RegisterResponse) => {
        if(response.statusCode == 201){
          this.successMessage = response.message
          this.router.navigate(['/login'])
        } else if(response.statusCode == 400){
          this.errorMessage = response.message
        }
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }


}
