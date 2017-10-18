import { ModalService } from './../shared/services/modal.service';
import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { ApolloQueryObservable } from 'apollo-angular';

import { UserService } from './../shared/services/user.service';
import { User } from './../shared/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {

  loading: boolean = true
  users: Array<User>
  newUser: User = new User;
  patternFirstName: string
  patternLastName: string
  patternEmail: string
  userObs: ApolloQueryObservable<any>;
  userSub: Subscription;
  subscriptionSub: Subscription;

  constructor(private userService: UserService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.userObs = this.userService.getUsers()
    this.userSub = this.userObs.subscribe(({ data, loading }) => {
      this.users = data.getUsers;
      this.loading = loading;
    }, (error) => {
      console.log('there was an error sending the query', error);
    })
  }

  onSubmitCreate(createForm): void {
    this.userService.addToAccount(this.newUser).subscribe(() => {
      this.modalService.close()
      createForm.reset()
    }, (error) => {
      console.log('there was an error sending the query', error);
    })
  }

  open(modalCreate): void {
    this.modalService.open(modalCreate)
  }
}