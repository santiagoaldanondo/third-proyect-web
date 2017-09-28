// import { User } from './../models/user.model';
// import { Http, Headers, Response, RequestOptions } from '@angular/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';

// import { Apollo } from 'apollo-angular';
// import gql from 'graphql-tag';

// @Injectable()
// export class AuthService {
//   private baseUrl = 'http://localhost:3000/api/graphql';
//   private headers = new Headers({ 'Content-Type': 'application/json' });
//   private options = new RequestOptions({ headers: this.headers, withCredentials: true });

//   private user: User

//   constructor(private http: Http) {
//     this.user = JSON.parse(localStorage.getItem('current_user'))
//   }

//   // isAuthenticated(): boolean {
//   //   return (this.user) ? true : false;
//   // }

//   authenticate(user: User): User {
//     this.user = user;
//     localStorage.setItem('current_user', JSON.stringify(this.user))
//     return this.user
//   }

//   // deAuthenticate(): void {
//   //   this.user = undefined;
//   //   localStorage.removeItem('current_user')
//   // }

//   // login(user: User): Observable<User | string> {
//   //   const data: Object = {
//   //     username: user.username,
//   //     password: user.password
//   //   };
//   //   return this.http.post(`${this.baseUrl}/login`, JSON.stringify(data), this.options)
//   //     .map((res: Response) => this.authenticate(res.json()))
//   //     .catch(this.handleError);
//   // }

//   // register(user: User): Observable<User | string> {
//   //   const data: Object = {
//   //     email: user.email,
//   //     password: user.password
//   //   };
//   //   return this.http.post(`${this.baseUrl}/register`, JSON.stringify(data), this.options)
//   //     .map((res: Response) => this.authenticate(res.json()))
//   //     .catch(this.handleError);
//   // }

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

// }
