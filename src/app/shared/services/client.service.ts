
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Apollo } from 'apollo-angular';
import graphqlTag from 'graphql-tag';

import { Client } from './../models/client.model';

@Injectable()
export class ClientService {

  private Client: Client

  constructor(private apollo: Apollo) { }

  getClients(): Observable<any> {
    const getClients = graphqlTag`query {
      getClients {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        insuranceNumber: string;
        insurance: string;
      }
    }`;

    return this.apollo.query({
      query: getClients
    })
  }


}
