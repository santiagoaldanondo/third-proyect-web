
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

  createClient(client: Client): Observable<any> {
    const mutation = graphqlTag`mutation(
      $firstName: String!,
      $lastName: String!,
      $email: email,
      $phone: phone,
      $insuranceNumber: insuranceNumber,
      $insurance: insurance
    ) {
        createClient(
          firstName: $firstName,
          lastName: $lastName,
          email: $email,
          phone: $phone,
          insuranceNumber: $insuranceNumber,
          insurance: $insurance
        )
      }`;
    return this.apollo.mutate({
      mutation: mutation,
      variables: {
        firstName: client.firstName,
        lastName: client.lastName,
        email: client.email,
        phone: client.phone,
        insuranceNumber: client.insuranceNumber,
        insurance: client.insurance,
      }
    })
  }

  updateClient(client: Client): Observable<any> {
    const mutation = graphqlTag`mutation(
      $_id: String!,
      $firstName: String!,
      $lastName: String!,
      $email: email,
      $phone: phone,
      $insuranceNumber: insuranceNumber,
      $insurance: insurance
    ) {
        updateClient(
          _id: $_id;
          firstName: $firstName,
          lastName: $lastName,
          email: $email,
          phone: $phone,
          insuranceNumber: $insuranceNumber,
          insurance: $insurance
        )
      }`;
    return this.apollo.mutate({
      mutation: mutation,
      variables: {
        firstName: client.firstName,
        lastName: client.lastName,
        email: client.email,
        phone: client.phone,
        insuranceNumber: client.insuranceNumber,
        insurance: client.insurance,
      }
    })
  }

}
