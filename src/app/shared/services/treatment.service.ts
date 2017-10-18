import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import graphqlTag from 'graphql-tag';

import { Treatment } from './../models/treatment.model';

@Injectable()
export class TreatmentService {

  private treatment: Treatment

  constructor(private apollo: Apollo) { }

  getTreatments(): ApolloQueryObservable<any> {
    const getTreatments = graphqlTag`query getTreatments{
      getTreatments {
        _id
        branch
        code
        description
      }
    }`;

    return this.apollo.watchQuery({
      query: getTreatments
    })
  }

  createTreatment(treatment: Treatment): Observable<any> {
    const mutation = graphqlTag`mutation createTreatment(
      $branch: String,
      $code: String,
      $description: String!
    ) {
        createTreatment(
          branch: $branch,
          code: $code,
          description: $description
        ) {
          _id
          branch
          code
          description
        }
      }`;
    return this.apollo.mutate({
      mutation: mutation,
      variables: {
        branch: treatment.branch,
        code: treatment.code,
        description: treatment.description
      },
      optimisticResponse: {
        __typename: 'Mutation',
        createTreatment: {
          __typename: 'Treatment',
          _id: null,
          branch: treatment.branch,
          code: treatment.code,
          description: treatment.description
        },
      },
      updateQueries: {
        getTreatments: (prev, { mutationResult }) => {
          console.log(mutationResult)
          const newTreatment: Treatment = mutationResult.data.createTreatment;
          const prevTreatments: Array<Treatment> = prev.getTreatments;
          prevTreatments.push(newTreatment)
          return { getTreatments: prevTreatments }
        },
      },
    })
  }

  updateTreatment(treatment: Treatment): Observable<any> {
    const mutation = graphqlTag`mutation updateTreatment(
      $_id: String!,
      $branch: String,
      $code: String,
      $description: String!
    ) {
        updateTreatment(
          _id: $id,
          branch: $branch,
          code: $code,
          description: $description
        ) {
          _id
          branch
          code
          description
        }
      }`;
    return this.apollo.mutate({
      mutation: mutation,
      variables: {
        _id: treatment._id,
        branch: treatment.branch,
        code: treatment.code,
        description: treatment.description
      }
    })
  }

}
