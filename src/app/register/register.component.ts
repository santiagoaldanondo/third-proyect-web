import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import graphqlTag from 'graphql-tag';

import { User } from './../shared/models/user.model';
import { Account } from './../shared/models/account.model';
import { AuthService } from './../shared/services/auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  account: Account = new Account();
  error: string;

  constructor(private apollo: Apollo, private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmitRegister() {
    this.authService.register(this.user, this.account)
  }
}
