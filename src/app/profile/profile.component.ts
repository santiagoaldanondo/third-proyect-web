import { ModalService } from './../shared/services/modal.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';

import { AuthService } from './../shared/services/auth.service';
import { User } from './../shared/models/user.model';
import { UserService } from './../shared/services/user.service';
import { Timetable } from './../shared/models/timetable.model';
import { TimetableService } from './../shared/services/timetable.service';
import { Pricing } from './../shared/models/pricing.model';
import { PricingService } from './../shared/services/pricing.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  timetables: Array<Timetable>
  pricings: Array<Pricing>
  invoice: number = 0
  error: string;
  oldPassword: string;
  newPassword: string;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private timetableService: TimetableService,
    private pricingService: PricingService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.loadUser()
    let combinedObservables = this.pricingService.getPricings()
      .combineLatest(this.timetableService.getTimetables(),
      (getPricings, getTimetables) => {
        this.timetables = getTimetables.data.getTimetables;
        this.pricings = getPricings.data.getPricings;
      });
    combinedObservables.subscribe(() => {
      this.calculateInvoice()
    })
  }

  loadUser(): void {
    this.user = this.authService.authUser()
  }

  onSubmitUpdate(updateForm): void {
    this.userService.updateUser(this.user).subscribe(data => {
      updateForm.reset()
      this.authService.authenticate(JSON.parse(JSON.stringify(data)).data.updateUser)
      this.loadUser()
      window.location.reload()
    })
  }

  onSubmitReset(resetForm): void {
    this.userService.resetPassword(this.oldPassword, this.newPassword).subscribe(data => {
      resetForm.reset()
      window.location.reload()
    })
  }

  open(modalCreate): void {
    this.modalService.open(modalCreate)
  }

  calculateInvoice(): void {
    let that = this
    let userTimetables = _.filter(this.timetables, function (o) {
      return o.user._id == that.user._id;
    });
    userTimetables.forEach(timetable => {
      let timetablePricing = _.filter(this.pricings, function (o) {
        return (o.treatment._id == timetable.treatment._id
          && o.insurance._id == timetable.client.insurance._id);
      });
      this.invoice += timetablePricing[0].price
    });
  }

}
