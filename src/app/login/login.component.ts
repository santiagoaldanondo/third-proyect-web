import { Router } from '@angular/router';
import { User } from './../shared/models/user.model';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../shared/services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  error: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmitLogin() {
    this.authService.login(this.user).subscribe(data => {
      this.authService.authenticate(JSON.parse(JSON.stringify(data)).data.login)
      this.router.navigate(['/account']);
    });
  }
}
