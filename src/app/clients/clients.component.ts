import { ModalService } from './../shared/services/modal.service';
import { Component, OnInit } from '@angular/core';

import { ClientService } from './../shared/services/client.service';
import { Client } from './../shared/models/client.model';
import { InsuranceService } from './../shared/services/insurance.service';
import { Insurance } from './../shared/models/insurance.model';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: Array<Client>
  insurances: Array<Insurance>
  newClient: Client = new Client
  pattern: string
  patternFirstName: string
  patternLastName: string
  patternEmail: string
  patternPhone: string
  patternInsuranceNumber: string
  patternInsurance: string

  constructor(private clientService: ClientService, private insuranceService: InsuranceService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.loadClients()
  }

  loadClients(): void {
    this.clientService.getClients().subscribe(({ data, loading }) => {
      this.clients = data.getClients;
    });
  }

  loadInsurances(): void {
    this.insuranceService.getInsurances().subscribe(({ data, loading }) => {
      this.insurances = data.getInsurances;
    });
  }

  onSubmitCreate(createForm): void {
    this.clientService.createClient(this.newClient).subscribe(data => {
      this.loadClients()
      createForm.reset()
      window.location.reload()
    })
  }

  open(modalCreate): void {
    this.loadInsurances()
    this.modalService.open(modalCreate)
  }

}