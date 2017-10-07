import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ApolloModule } from 'apollo-angular';
import { DataTableModule } from "angular2-datatable";

import './rxjs.operators'
import { apolloClient } from './client';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';
import { InsurancesComponent } from './insurances/insurances.component';
import { PricingsComponent } from './pricings/pricings.component';
import { ClientsComponent } from './clients/clients.component';
import { TimetablesComponent } from './timetables/timetables.component';
import { TreatmentsComponent } from './treatments/treatments.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ModalService } from './shared/services/modal.service';

import { AuthService } from './shared/services/auth.service';
import { UserService } from './shared/services/user.service';
import { InsuranceService } from './shared/services/insurance.service';
import { TreatmentService } from './shared/services/treatment.service';
import { PricingService } from './shared/services/pricing.service';
import { ClientService } from './shared/services/client.service';
import { TimetableService } from './shared/services/timetable.service';

import { FilterPipe } from './pipes/filter.pipe';
import { FilterPopulatePipe } from './pipes/filter-populate.pipe';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'account', component: AccountComponent, children: [
      { path: 'timetables', component: TimetablesComponent },
      { path: 'clients', component: ClientsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'users', component: UsersComponent },
      { path: 'treatments', component: TreatmentsComponent },
      { path: 'insurances', component: InsurancesComponent },
      { path: 'pricings', component: PricingsComponent },
    ]
  },
  { path: '**', redirectTo: 'home' }
]
@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    InsurancesComponent,
    PricingsComponent,
    ClientsComponent,
    TimetablesComponent,
    TreatmentsComponent,
    NavbarComponent,
    ProfileComponent,
    FilterPipe,
    FilterPopulatePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    ApolloModule.forRoot(apolloClient),
    NgbModule.forRoot(),
    DataTableModule
  ],
  providers: [
    ModalService,
    AuthService,
    UserService,
    InsuranceService,
    TreatmentService,
    PricingService,
    ClientService,
    TimetableService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
