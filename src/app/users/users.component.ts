import { Component, OnInit, NgZone } from '@angular/core';

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
  isEditing: Boolean = false
  newUser: User = new User();

  constructor(private userService: UserService, private ngZone: NgZone) { }

  ngOnInit() {
    this.loadUsers()
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(({ data, loading }) => {
      this.users = data.getUsers;
      this.loading = loading;
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  ngForTrackBy(index: number, user: User): string { return user._id; }

  onSubmitAddToAccount(addToAccountForm) {
    this.userService.addToAccount(this.newUser).subscribe(data => {
      this.loadUsers()
      this.ngZone.run(() => {
        console.log('enabled time travel');
      });
      this.toggleEdit()
      addToAccountForm.reset()
      window.location.reload()
    })
  }
}