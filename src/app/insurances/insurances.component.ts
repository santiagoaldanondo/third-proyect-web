import { ModalService } from './../shared/services/modal.service';
import { Component, OnInit } from '@angular/core';

import { InsuranceService } from './../shared/services/insurance.service';
import { Insurance } from './../shared/models/insurance.model';

@Component({
  selector: 'app-insurances',
  templateUrl: './insurances.component.html',
  styleUrls: ['./insurances.component.css']
})
export class InsurancesComponent implements OnInit {

  loading = true
  insurances: Array<Insurance>
  newInsurance: Insurance = new Insurance
  patternName: string

  constructor(private insuranceService: InsuranceService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.loadInsurances()
  }

  loadInsurances(): void {
    this.insuranceService.getInsurances().subscribe(({ data, loading }) => {
      this.insurances = data.getInsurances;
      this.loading = loading;
    });
  }

  onSubmitCreate(createForm): void {
    this.insuranceService.createInsurance(this.newInsurance).subscribe(data => {
      this.loadInsurances()
      createForm.reset()
      window.location.reload()
    })
  }

  open(modalCreate): void {
    this.modalService.open(modalCreate)
  }

}
