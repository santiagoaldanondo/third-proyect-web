import { ModalService } from './../shared/services/modal.service';
import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { ApolloQueryObservable } from 'apollo-angular';

import { InsuranceService } from './../shared/services/insurance.service';
import { Insurance } from './../shared/models/insurance.model';

@Component({
  selector: 'app-insurances',
  templateUrl: './insurances.component.html',
  styleUrls: ['./insurances.component.css']
})
export class InsurancesComponent implements OnInit {

  loading: boolean = true
  insurances: Array<Insurance>
  newInsurance: Insurance = new Insurance
  patternName: string
  insuranceObs: ApolloQueryObservable<any>;
  insuranceSub: Subscription;
  subscriptionSub: Subscription;

  constructor(private insuranceService: InsuranceService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.insuranceObs = this.insuranceService.getInsurances()
    this.insuranceSub = this.insuranceObs.subscribe(({ data, loading }) => {
      this.insurances = data.getInsurances;
      this.loading = loading;
    }, (error) => {
      console.log('there was an error sending the query', error);
    })
  }

  onSubmitCreate(createForm): void {
    this.insuranceService.createInsurance(this.newInsurance).subscribe(() => {
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
