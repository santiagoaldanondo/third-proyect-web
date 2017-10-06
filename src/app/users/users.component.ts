import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

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
  newUser: User = new User;
  closeResult: string;
  patternFirstName: string
  patternLastName: string
  patternEmail: string

  constructor(private userService: UserService, private modalService: NgbModal) { }

  ngOnInit() {
    this.loadUsers()
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(({ data, loading }) => {
      this.users = data.getUsers;
      this.loading = loading;
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  onSubmitAddToAccount(addToAccountForm) {
    this.userService.addToAccount(this.newUser).subscribe(data => {
      this.loadUsers()
      this.toggleEdit()
      addToAccountForm.reset()
      window.location.reload()
    })
  }

  open(modalCreate) {
    this.modalService.open(modalCreate).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}