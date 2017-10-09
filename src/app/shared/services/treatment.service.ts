
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Apollo } from 'apollo-angular';
import graphqlTag from 'graphql-tag';

import { Treatment } from './../models/treatment.model';

@Injectable()
export class TreatmentService {

  private treatment: Treatment

  constructor(private apollo: Apollo) { }

  getTreatments(): Observable<any> {
    const getTreatments = graphqlTag`query {
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
    const mutation = graphqlTag`mutation(
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
      }
    })
  }

  updateTreatment(treatment: Treatment): Observable<any> {
    const mutation = graphqlTag`mutation(
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
