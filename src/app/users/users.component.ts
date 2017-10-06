import { ModalService } from './../shared/services/modal.service';
import { Component, OnInit } from '@angular/core';

import { UserService } from './../shared/services/user.service';
import { User } from './../shared/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {

  loading = true
  users: Array<User>
  newUser: User = new User;
  patternFirstName: string
  patternLastName: string
  patternEmail: string

  constructor(private userService: UserService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.loadUsers()
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(({ data, loading }) => {
      this.users = data.getUsers;
      this.loading = loading;
    });
  }

  onSubmitAddToAccount(addToAccountForm): void {
    this.userService.addToAccount(this.newUser).subscribe(data => {
      this.loadUsers()
      addToAccountForm.reset()
      window.location.reload()
    })
  }

  open(modalCreate): void {
    this.modalService.open(modalCreate)
  }
}