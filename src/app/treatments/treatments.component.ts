import { ModalService } from './../shared/services/modal.service';
import { Component, OnInit } from '@angular/core';

import { TreatmentService } from './../shared/services/treatment.service';
import { Treatment } from './../shared/models/treatment.model';

@Component({
  selector: 'app-treatments',
  templateUrl: './treatments.component.html',
  styleUrls: ['./treatments.component.css']
})
export class TreatmentsComponent implements OnInit {

  loading = true
  treatments: Array<Treatment>
  newTreatment: Treatment = new Treatment
  patternBranch: string
  patternCode: string
  patternDescription: string

  constructor(private treatmentService: TreatmentService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.loadTreatments()
  }

  loadTreatments(): void {
    this.treatmentService.getTreatments().subscribe(({ data, loading }) => {
      this.treatments = data.getTreatments;
      this.loading = loading;
    });
  }

  onSubmitCreate(createForm): void {
    this.treatmentService.createTreatment(this.newTreatment).subscribe(data => {
      this.loadTreatments()
      createForm.reset()
      window.location.reload()
    })
  }

  open(modalCreate): void {
    this.modalService.open(modalCreate)
  }

}
