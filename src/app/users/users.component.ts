import { Component, OnInit } from '@angular/core';

import { Apollo } from 'apollo-angular';
import graphqlTag from 'graphql-tag';

import { UserService } from './../shared/services/user.service';
import { User } from './../shared/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  loading = true
  users: Array<User>
  isEditing: Boolean = false
  newUser: User = new User;

  constructor(private apollo: Apollo, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(({ data, loading }) => {
      this.users = data.getUsers;
      this.loading = loading;
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  trackByUser(index: number, user: User): string { return user._id; }

  onSubmitAddToAccount() {
    this.userService.addToAccount(this.newUser).subscribe(data => { })
    this.ngOnInit();
  }
}