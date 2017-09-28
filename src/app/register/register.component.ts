import { Router } from '@angular/router';
import { User } from './../shared/models/user.model';
import { Account } from './../shared/models/account.model';
import { Component, OnInit } from '@angular/core';

import { Apollo } from 'apollo-angular';
import graphqlTag from 'graphql-tag';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  account: Account = new Account();
  error: string;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
  }

  onSubmitRegister(RegisterForm) {
    let data = new Object;
    data["firstName"] = this.account.description
    data["lastName"] = this.user.lastName
    data["email"] = this.user.email
    data["password"] = this.user.password
    data["description"] = this.account.description
    console.log(data)

    const mutation = graphqlTag`mutation($register: register) {
    register(data) {
      firstName
      lastName
      email
      password
      description
    }
  }`;
    this.apollo.mutate({
      mutation: mutation,
      variables: data
    }).subscribe(data => {
      console.log('Created new account and owner user!', data);
    });
  }
}
