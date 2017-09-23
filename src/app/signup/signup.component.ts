import { Router } from '@angular/router';
import { User } from './../shared/models/user.model';
import { Component, OnInit } from '@angular/core';

import { Apollo } from 'apollo-angular';
import graphqlTag from 'graphql-tag';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user: User = new User();
  error: string;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
  }

  onSubmitSignup(SignupForm) {
    const mutation = graphqlTag`mutation($newUser: NewUser) {
    signup(newUser: $newUser) {
      firstName
      lastName
      email
      password  
    }
  }`;
    this.apollo.mutate({
      mutation: mutation,
      variables: {
        newUser: this.user,
      }
    }).subscribe(data => {
      console.log('New user created!', data);
    });
  }
}