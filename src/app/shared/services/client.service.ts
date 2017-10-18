
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import graphqlTag from 'graphql-tag';

import { Client } from './../models/client.model';

@Injectable()
export class ClientService {

  private client: Client

  constructor(private apollo: Apollo) { }

  getClients(): ApolloQueryObservable<any> {
    const getClients = graphqlTag`query getClients{
        getClients {
          _id
          firstName
          lastName
          email
          phone
          insuranceNumber
          insurance {
            _id
            name
          }
        }
      }`;

    return this.apollo.watchQuery({
      query: getClients
    })
  }

  clientAdded(): Observable<any> {
    const clientAdded = graphqlTag`
    subscription clientAdded {
      clientAdded {
        __typename
        _id
        firstName
        lastName
        email
        phone
        insuranceNumber
        insurance {
          _id
          name
        }
      }
    }
  `;
    return this.apollo.subscribe({
      query: clientAdded,
      variables: {}
    })
  }

  createClient(client: Client): Observable<any> {
    const mutation = graphqlTag`mutation createClient(
        $firstName: String!,
        $lastName: String!,
        $email: String,
        $phone: String!,
        $insuranceNumber: String,
        $insurance: ID!,
      ) {
          createClient(
            firstName: $firstName,
            lastName: $lastName,
            email: $email,
            phone: $phone,
            insuranceNumber: $insuranceNumber,
            insurance: $insurance
          ) {
            _id
            firstName
            lastName
            email
            phone
            insuranceNumber
            insurance {
              _id
              name
            }
          }
        }`;
    return this.apollo.mutate({
      mutation: mutation,
      variables: {
        firstName: client.firstName,
        lastName: client.lastName,
        email: client.email,
        phone: client.phone,
        insuranceNumber: client.insuranceNumber,
        insurance: client.insurance
      }
    })
  }

  updateClient(client: Client): Observable<any> {
    const mutation = graphqlTag`mutation updateClient(
        $_id: String!,
        $firstName: String!,
        $lastName: String!,
        $email: String,
        $phone: String!,
        $insuranceNumber: String,
        $insurance: ID!,
      ) {
          updateClient(
            _id: $String,
            firstName: $firstName,
            lastName: $lastName,
            email: $email,
            phone: $phone,
            insuranceNumber: $insuranceNumber,
            insurance: $insurance
          ) {
            _id
            firstName
            lastName
            email
            phone
            insuranceNumber
            insurance {
              _String
              name
            }
          }
        }`;
    return this.apollo.mutate({
      mutation: mutation,
      variables: {
        _id: client._id,
        firstName: client.firstName,
        lastName: client.lastName,
        email: client.email,
        phone: client.phone,
        insuranceNumber: client.insuranceNumber,
        insurance: client.insurance
      }
    })
  }

}