import { ModalService } from './../shared/services/modal.service';
import { Component, OnInit } from '@angular/core';

import { PricingService } from './../shared/services/pricing.service';
import { Pricing } from './../shared/models/pricing.model';
import { TreatmentService } from './../shared/services/treatment.service';
import { Treatment } from './../shared/models/treatment.model';
import { InsuranceService } from './../shared/services/insurance.service';
import { Insurance } from './../shared/models/insurance.model';

@Component({
  selector: 'app-pricings',
  templateUrl: './pricings.component.html',
  styleUrls: ['./pricings.component.css']
})
export class PricingsComponent implements OnInit {

  pricings: Array<Pricing>
  treatments: Array<Treatment>
  insurances: Array<Insurance>
  newPricing: Pricing = new Pricing
  pattern: string
  patternCode: string
  patternDescription: string

  constructor(private pricingService: PricingService, private treatmentService: TreatmentService, private insuranceService: InsuranceService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.loadPricings()
  }

  loadPricings(): void {
    this.pricingService.getPricings().subscribe(({ data, loading }) => {
      this.pricings = data.getPricings;
    });
  }

  loadTreatments(): void {
    this.treatmentService.getTreatments().subscribe(({ data, loading }) => {
      this.treatments = data.getTreatments;
    });
  }

  loadInsurances(): void {
    this.insuranceService.getInsurances().subscribe(({ data, loading }) => {
      this.insurances = data.getInsurances;
    });
  }

  onSubmitCreate(createForm): void {
    this.pricingService.createPricing(this.newPricing).subscribe(data => {
      this.loadPricings()
      createForm.reset()
      window.location.reload()
    })
  }

  open(modalCreate): void {
    this.loadTreatments()
    this.loadInsurances()
    this.modalService.open(modalCreate)
  }

}
