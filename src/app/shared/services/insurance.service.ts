import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import graphqlTag from 'graphql-tag';

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
    const mutation = graphqlTag`mutation createInsurance(
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
          console.log(mutationResult)
          const newInsurance: Insurance = mutationResult.data.createInsurance;
          const prevInsurances: Array<Insurance> = prev.getInsurances;
          prevInsurances.push(newInsurance)
          return { getInsurances: prevInsurances }
        },
      },
    })
  }

  updateInsurance(insurance: Insurance): Observable<any> {
    const mutation = graphqlTag`mutation updateInsurance(
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
