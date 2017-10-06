import { ModalService } from './../shared/services/modal.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from './../shared/services/auth.service';
import { UserService } from './../shared/services/user.service';
import { User } from './../shared/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  error: string;
  oldPassword: string;
  newPassword: string;

  constructor(private userService: UserService, private authService: AuthService, private modalService: ModalService) { }

  ngOnInit() {
    this.loadUser()
  }

  loadUser(): void {
    this.user = this.authService.authUser()
  }

  onSubmitUpdateUser(updateUserForm): void {
    console.log(this.user)
    this.userService.updateUser(this.user).subscribe(data => {
      updateUserForm.reset()
      this.authService.authenticate(JSON.parse(JSON.stringify(data)).data.updateUser)
      this.loadUser()
      window.location.reload()
    })
  }

  onSubmitResetPassword(resetPasswordForm): void {
    this.userService.resetPassword(this.oldPassword, this.newPassword).subscribe(data => {
      resetPasswordForm.reset()
      window.location.reload()
    })
  }

  open(modalCreate): void {
    this.modalService.open(modalCreate)
  }

}
