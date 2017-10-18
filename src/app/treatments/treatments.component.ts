import { ModalService } from './../shared/services/modal.service';
import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { ApolloQueryObservable } from 'apollo-angular';

import { TreatmentService } from './../shared/services/treatment.service';
import { Treatment } from './../shared/models/treatment.model';

@Component({
  selector: 'app-treatments',
  templateUrl: './treatments.component.html',
  styleUrls: ['./treatments.component.css']
})
export class TreatmentsComponent implements OnInit {

  loading: boolean = true
  treatments: Array<Treatment>
  newTreatment: Treatment = new Treatment
  patternBranch: string
  patternCode: string
  patternDescription: string
  treatmentObs: ApolloQueryObservable<any>;
  treatmentSub: Subscription;
  subscriptionSub: Subscription;

  constructor(private treatmentService: TreatmentService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.treatmentObs = this.treatmentService.getTreatments()
    this.treatmentSub = this.treatmentObs.subscribe(({ data, loading }) => {
      this.treatments = data.getTreatments;
      this.loading = loading;
    }, (error) => {
      console.log('there was an error sending the query', error);
    })
  }

  onSubmitCreate(createForm): void {
    this.treatmentService.createTreatment(this.newTreatment).subscribe(() => {
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
