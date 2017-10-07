
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Apollo } from 'apollo-angular';
import graphqlTag from 'graphql-tag';

import { Timetable } from './../models/timetable.model';

@Injectable()
export class TimetableService {

  private timetable: Timetable

  constructor(private apollo: Apollo) { }

  getTimetables(): Observable<any> {
    const getTimetables = graphqlTag`query {
      getTimetables {
        _id
        date
        client {
          _id
          firstName
          lastName
          phone
          insurance {
            _id
            name
          }
        }
        treatment {
          _id
          description
        }
        user {
          _id
          firstName
          lastName
          email
        }
        notes
        info
      }
    }`;

    return this.apollo.query({
      query: getTimetables
    })
  }

  createTimetable(timetable: Timetable): Observable<any> {
    const mutation = graphqlTag`mutation(
      $date: Date!,
      $client: ID,
      $treatment: ID,
      $user: ID,
      $notes: String,
      $info: String,
    ) {
        createTimetable(
          date: $date,
          client: $client,
          treatment: $treatment,
          user: $user,
          notes: $notes,
          info: $info
        ) {
          _id
          date
          client {
            _id
            firstName
            lastName
            phone
            insurance {
              _id
              name
            }
          }
          treatment {
            _id
            description
          }
          user {
            _id
            firstName
            lastName
            email
          }
          notes
          info
        }
      }`;
    return this.apollo.mutate({
      mutation: mutation,
      variables: {
        date: timetable.date,
        client: timetable.client,
        treatment: timetable.treatment,
        user: timetable.user,
        notes: timetable.notes,
        info: timetable.info,
      }
    })
  }

  updateTimetable(timetable: Timetable): Observable<any> {
    const mutation = graphqlTag`mutation(
      $_id: String!,
      $date: Date!,
      $client: ID,
      $treatment: ID,
      $user: ID,
      $notes: String,
      $info: String,
    ) {
        updateTimetable(
          _id: $id,
          date: $date,
          client: $client,
          treatment: $treatment,
          user: $user,
          notes: $notes,
          info: $info
        ) {
          _id
          date
          client {
            _id
            firstName
            lastName
            phone
            insurance {
              _id
              name
            }
          }
          treatment {
            _id
            description
          }
          user {
            _id
            firstName
            lastName
            email
          }
          notes
          info
        }
      }`;
    return this.apollo.mutate({
      mutation: mutation,
      variables: {
        _id: timetable._id,
        date: timetable.date,
        client: timetable.client,
        treatment: timetable.treatment,
        user: timetable.user,
        notes: timetable.notes,
        info: timetable.info,
      }
    })
  }

}
