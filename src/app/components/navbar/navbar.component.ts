import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppUser } from 'src/app/models/AppUser';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  appUser: AppUser
  isLoggedIn: boolean

  constructor(private userService: UserService, private auth: AuthService, private router: Router){
    this.isLoggedIn = auth.isLoggedIn()
  }

  ngOnInit(): void {
    this.userService.user$.subscribe({
      next: (user:AppUser) => {
        this.appUser = user
      }
    })
  }

  logout(){
    this.userService.clearUser()
    this.auth.clear()
    this.router.navigate(['/login'])
  }

}
