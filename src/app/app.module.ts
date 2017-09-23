import { AuthService } from './shared/services/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ApolloModule } from 'apollo-angular';

import { client } from './client';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', redirectTo: 'signup', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'users', component: UsersComponent },
]
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    UsersComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    ApolloModule.forRoot(client)
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
