
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Apollo } from 'apollo-angular';
import graphqlTag from 'graphql-tag';

import { Insurance } from './../models/insurance.model';

@Injectable()
export class InsuranceService {

  private insurance: Insurance

  constructor(private apollo: Apollo) { }

  getInsurances(): Observable<any> {
    const getInsurances = graphqlTag`query {
      getInsurances {
        _id: string!;
        name: string!;
      }
    }`;

    return this.apollo.query({
      query: getInsurances
    })
  }

  createInsurance(insurance: Insurance): Observable<any> {
    const mutation = graphqlTag`mutation(
      $name: String!
    ) {
        createInsurance(
          name: $name,
        )
      }`;
    return this.apollo.mutate({
      mutation: mutation,
      variables: {
        name: insurance.name,
      }
    })
  }

  updateInsurance(insurance: Insurance): Observable<any> {
    const mutation = graphqlTag`mutation(
      $_id: String!,
      $name: String!
    ) {
        updateInsurance(
          _id: $id,
          name: $name,
        )
      }`;
    return this.apollo.mutate({
      mutation: mutation,
      variables: {
        _id: insurance._id,
        name: insurance.name,
      }
    })
  }

}
