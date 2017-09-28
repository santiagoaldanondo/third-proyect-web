
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Apollo } from 'apollo-angular';
import graphqlTag from 'graphql-tag';

import { User } from './../models/user.model';
import { Account } from './../models/account.model';

@Injectable()
export class AuthService {

    private token: String

    constructor(private apollo: Apollo) {
        this.token = localStorage.getItem("JWT_TOKEN")
    }

    isAuthenticated(): boolean {
        return (this.token) ? true : false;
    }

    authenticate(data: any): void {
        const token = data.data.login
        this.token = token
        localStorage.setItem("JWT_TOKEN", token)
    }

    deAuthenticate(): void {
        this.token = undefined;
        localStorage.removeItem("JWT_TOKEN")
    }

    login(user: User): void {
        const mutation = graphqlTag`mutation(
            $email: String!,
            $password: String!,
          ) {
              login(
                email: $email,
                password: $password,
              )
            }`;
        this.apollo.mutate({
            mutation: mutation,
            variables: {
                email: user.email,
                password: user.password,
            }
        }).subscribe(data => {
            this.authenticate(data)
        });
    }

    register(user: User, account: Account): void {
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
          ) {
            firstName
            lastName
            email
            password
          }
        }`;
        this.apollo.mutate({
            mutation: mutation,
            variables: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
                description: account.description
            }
        }).subscribe(data => {
            console.log('Created new account and owner user!', data);
        });
    }

    //   // logout(): Observable<boolean | string> {
    //   //   return this.http.post(`${this.baseUrl}/logout`, null, this.options)
    //   //     .map((res: Response) => {
    //   //       this.deAuthenticate()
    //   //       return res.status === 204
    //   //     })
    //   //     .catch(this.handleError);
    //   // }

    //   private handleError(error: Response | any): Observable<string> {
    //     console.error(error);
    //     return Observable.throw(error.json().message);
    //   }

}
