
import { Http, Headers, Response, RequestOptions } from '@angular/http';
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

    constructor(private apollo: Apollo) {
        this.token = localStorage.getItem("JWT_TOKEN")
    }

    authUser(): User {
        return this.user
    }

    isAuthenticated(): boolean {
        return (this.token) ? true : false;
    }

    authenticate(data: any): void {
        const token = data
        this.token = token
        localStorage.setItem("JWT_TOKEN", token)
        var decoded = jwtDecode(this.token);
        this.user = decoded.authUser
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
