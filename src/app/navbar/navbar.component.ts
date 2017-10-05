import { Component, OnInit } from '@angular/core';
import { ROUTES, MenuType } from './navbar-routes.config';

@Component({
  moduleId: module.id,
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public mainItems: any[];
  public adminItems: any[];

  constructor() {
    this.mainItems = ROUTES.filter(menuItem => menuItem.menuType === MenuType.MAIN);
    this.adminItems = ROUTES.filter(menuItem => menuItem.menuType === MenuType.ADMIN);
  }

  ngOnInit() { }

}
