
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import graphqlTag from 'graphql-tag';
import * as _ from 'lodash'

import { Insurance } from './../models/insurance.model';

@Injectable()
export class InsuranceService {

  private insurance: Insurance

  constructor(private apollo: Apollo) { }

  getInsurances(): ApolloQueryObservable<any> {
    const getInsurances = graphqlTag`query getInsurances {
      getInsurances {
        _id
        name
      }
    }`;

    return this.apollo.watchQuery({
      query: getInsurances
    })
  }

  createInsurance(insurance: Insurance): Observable<any> {
    const mutation = graphqlTag`mutation(
      $name: String!
    ) {
        createInsurance(
          name: $name,
        ) {
          __typename
          _id
          name
        }
      }`;
    return this.apollo.mutate({
      mutation: mutation,
      variables: {
        name: insurance.name,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        createInsurance: {
          __typename: 'Insurance',
          _id: null,
          name: insurance.name,
        },
      },
      updateQueries: {
        getInsurances: (prev, { mutationResult }) => {
          console.log("update")
          const newInsurance: Insurance = mutationResult.data.createInsurance;
          const prevInsurances: Array<Insurance> = prev.getInsurances;
          if (newInsurance) {
            const repeatedInsurance: Array<Insurance> = _.find(prevInsurances, function (o) {
              return o._id === newInsurance._id;
            })
            if (!repeatedInsurance) {
              prevInsurances.push(newInsurance)
            }
          }
          return { getInsurances: prevInsurances }
        },
      },
    })
  }

  insuranceAdded(): Observable<any> {
    const insuranceAdded = graphqlTag`
    subscription insuranceAdded {
      insuranceAdded {
        __typename
        _id
        name
      }
    }
  `;

    return this.apollo.subscribe({
      query: insuranceAdded,
      variables: {}
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
        ) {
          _id
          name
        }
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
