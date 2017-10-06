
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Apollo } from 'apollo-angular';
import graphqlTag from 'graphql-tag';

import { User } from './../models/user.model';

@Injectable()
export class UserService {

  private user: User

  constructor(private apollo: Apollo) { }

  getUsers(): Observable<any> {
    const getUsers = graphqlTag`query {
      getUsers {
        _id
        firstName
        lastName
        email
      }
    }`;

    return this.apollo.query({
      query: getUsers
    })
  }

  addToAccount(user: User): Observable<any> {
    const mutation = graphqlTag`mutation(
      $firstName: String!,
      $lastName: String!,
      $email: String!,
      $password: String!
    ) {
      addToAccount(
          firstName: $firstName,
          lastName: $lastName,
          email: $email,
          password: $password
        ) {
          _id
          firstName
          lastName
          email          
        }
      }`;
    return this.apollo.mutate({
      mutation: mutation,
      variables: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password
      }
    })
  }

  updateUser(user: User): Observable<any> {
    console.log(user)
    const mutation = graphqlTag`mutation(
      $_id: String!
      $firstName: String!,
      $lastName: String!,
      $email: String!
    ) {
        updateUser(
          _id: $_id,
          firstName: $firstName,
          lastName: $lastName,
          email: $email
        ) 
      }`;
    return this.apollo.mutate({
      mutation: mutation,
      variables: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    })
  }

  resetPassword(oldPassword, newPassword): Observable<any> {
    const mutation = graphqlTag`mutation(
      $oldPassword: String!,
      $newPassword: String!,
    ) {
        resetPassword(
          oldPassword: $oldPassword,
          newPassword: $newPassword,
        )
      }`;
    return this.apollo.mutate({
      mutation: mutation,
      variables: {
        oldPassword: oldPassword,
        newPassword: newPassword,
      }
    })
  }
}
