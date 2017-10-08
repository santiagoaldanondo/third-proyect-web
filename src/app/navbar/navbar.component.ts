import { AuthService } from './../shared/services/auth.service';
import { User } from './../shared/models/user.model';
import { Account } from './../shared/models/account.model';
import { Component, OnInit } from '@angular/core';
import { ROUTES, MenuType } from './navbar-routes.config';
import { Router } from '@angular/router';


@Component({
  moduleId: module.id,
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css']
})
export class NavbarComponent implements OnInit {
  mainItems: any[]
  adminItems: any[]
  isAdmin: boolean = false
  user: User
  account: Account

  constructor(private router: Router, private authService: AuthService) {
    this.mainItems = ROUTES.filter(menuItem => menuItem.menuType === MenuType.MAIN)
    this.adminItems = ROUTES.filter(menuItem => menuItem.menuType === MenuType.ADMIN)
  }

  ngOnInit(): void {
    this.user = this.authService.authUser()
    this.account = this.authService.authAccount()
    this.isAdmin = this.authService.isAdmin()
  }

  logout(): void {
    this.authService.logout()
    this.router.navigate(['/home']);
  }

}
