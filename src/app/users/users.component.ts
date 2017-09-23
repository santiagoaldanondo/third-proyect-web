import { User } from './../shared/models/user.model';
import { Component, OnInit } from '@angular/core';

import { Apollo } from 'apollo-angular';
import graphqlTag from 'graphql-tag';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  loading = true;
  data: any

  constructor(private apollo: Apollo) { }

  ngOnInit() {

    const getUsers = graphqlTag`query {
      getUsers {
        _id
        firstName
        lastName
        email
        password  
      }
    }`;

    this.apollo.query({
      query: getUsers
    }).subscribe(({ data, loading }) => {
      this.data = data;
      this.loading = loading;
    });
  }
}
