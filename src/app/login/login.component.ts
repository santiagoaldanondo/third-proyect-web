import { Router } from '@angular/router';
import { User } from './../shared/models/user.model';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../shared/services/auth.service'

import { Apollo } from 'apollo-angular';
import graphqlTag from 'graphql-tag';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  error: string;

  constructor(private apollo: Apollo, private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmitLogin() {
    this.authService.login(this.user)
  }
}
