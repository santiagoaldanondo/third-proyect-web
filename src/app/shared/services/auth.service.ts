
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Apollo } from 'apollo-angular';
import graphqlTag from 'graphql-tag';

import { User } from './../models/user.model';
import { Account } from './../models/account.model';

import jwtDecode from 'jwt-decode';

@Injectable()
export class AuthService {

    private token: String
    private user: User
    private account: Account

    constructor(private apollo: Apollo) {
        this.token = localStorage.getItem("JWT_TOKEN")
    }

    decodeToken(): any {
        return jwtDecode(this.token);
    }

    authUser(): User {
        return this.decodeToken().authUser
    }

    authAccount(): Account {
        return this.decodeToken().authAccount.account
    }

    isAuthenticated(): boolean {
        return (this.token) ? true : false;
    }

    isAdmin(): boolean {
        return (this.authUser()._id === this.authAccount().owner
            || this.authUser().isAdmin) ? true : false;
    }

    authenticate(data: any): void {
        const token = data
        this.token = token
        localStorage.setItem("JWT_TOKEN", token)
    }

    deAuthenticate(): void {
        this.token = undefined;
        localStorage.removeItem("JWT_TOKEN")
    }

    login(user: User): Observable<any> {
        const mutation = graphqlTag`mutation(
            $email: String!,
            $password: String!,
          ) {
              login(
                email: $email,
                password: $password,
              )
            }`;
        return this.apollo.mutate({
            mutation: mutation,
            variables: {
                email: user.email,
                password: user.password,
            }
        })
    }

    register(user: User, account: Account): Observable<any> {
        const mutation = graphqlTag`mutation(
        $firstName: String!,
        $lastName: String!,
        $email: String!,
        $password: String!,
        $description: String!
      ) {
          register(
            firstName: $firstName,
            lastName: $lastName,
            email: $email,
            password: $password,
            description: $description
          )
        }`;
        return this.apollo.mutate({
            mutation: mutation,
            variables: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
                description: account.description
            }
        })
    }

    logout(): void {
        localStorage.removeItem("JWT_TOKEN")
    }

    //   private handleError(error: Response | any): Observable<string> {
    //     console.error(error);
    //     return Observable.throw(error.json().message);
    //   }

}
