
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import graphqlTag from 'graphql-tag';

import { Timetable } from './../models/timetable.model';

@Injectable()
export class TimetableService {

  private timetable: Timetable

  constructor(private apollo: Apollo) { }

  getTimetables(): ApolloQueryObservable<any> {
    const getTimetables = graphqlTag`query getTimetables{
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

    return this.apollo.watchQuery({
      query: getTimetables
    })
  }

  timetableAdded(): Observable<any> {
    const timetableAdded = graphqlTag`
    subscription timetableAdded {
      timetableAdded {
        __typename
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
    }
  `;
    return this.apollo.subscribe({
      query: timetableAdded,
      variables: {}
    })
  }

  createTimetable(timetable: Timetable): Observable<any> {
    const mutation = graphqlTag`mutation createTimetable(
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
    const mutation = graphqlTag`mutation updateTimetable(
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
