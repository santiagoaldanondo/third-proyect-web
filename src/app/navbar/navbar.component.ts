import { PricingService } from './../shared/services/pricing.service';
import { UserService } from './../shared/services/user.service';
import { TreatmentService } from './../shared/services/treatment.service';
import { TimetableService } from './../shared/services/timetable.service';
import { InsuranceService } from './../shared/services/insurance.service';
import { ClientService } from './../shared/services/client.service';
import { LoadingComponent } from './../../../../../githunt-graphql/GitHunt-Angular/src/app/shared/loading.component';
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

  constructor(
    private router: Router,
    private authService: AuthService,
    private timetableService: TimetableService,
    private clientService: ClientService,
    private treatmentService: TreatmentService,
    private userService: UserService,
    private pricingService: PricingService,
    private insuranceService: InsuranceService
  ) {
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

  prefetchMain() {
    this.userService.getUsers().subscribe()
    this.pricingService.getPricings().subscribe()
    this.insuranceService.getInsurances().subscribe()
    this.treatmentService.getTreatments().subscribe()
    this.timetableService.getTimetables().subscribe()
    this.clientService.getClients().subscribe();
  }

  prefetchAdmin() {
    this.userService.getUsers().subscribe()
    this.insuranceService.getInsurances().subscribe()
    this.pricingService.getPricings().subscribe()
    this.treatmentService.getTreatments().subscribe()
  }

}
