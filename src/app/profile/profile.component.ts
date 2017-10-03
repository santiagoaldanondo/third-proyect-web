import { AuthService } from './../shared/services/auth.service';
import { UserService } from './../shared/services/user.service';
import { Router } from '@angular/router';
import { User } from './../shared/models/user.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  error: string;

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.authUser()
  }

  onSubmitUpdate() {
  };

}
