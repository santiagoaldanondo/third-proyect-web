import { ModalService } from './../shared/services/modal.service';
import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { ApolloQueryObservable } from 'apollo-angular';

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

  loading: boolean = true
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
  clientObs: ApolloQueryObservable<any>;
  clientSub: Subscription;
  subscriptionSub: Subscription;

  constructor(private clientService: ClientService, private insuranceService: InsuranceService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.clientObs = this.clientService.getClients()
    this.clientSub = this.clientObs.subscribe(({ data, loading }) => {
      this.clients = data.getClients;
      this.loading = loading;
    }, (error) => {
      console.log('there was an error sending the query', error);
    })

    this.subscriptionSub = this.clientService.clientAdded().subscribe({
      next: (data) => {
        const newClient: Client = data.clientAdded;
        this.clientObs.updateQuery((prev) => {
          console.log("pepe")
          const prevClients: Array<Client> = JSON.parse(JSON.stringify(prev.getClients));
          prevClients.push(newClient)
          return { getClients: prevClients }
        });
      },
      error(err: any): void {
        console.error('err', err);
      }
    });
  }

  loadInsurances(): void {
    this.insuranceService.getInsurances().subscribe(({ data, loading }) => {
      this.insurances = data.getInsurances;
    });
  }

  onSubmitCreate(createForm): void {
    this.clientService.createClient(this.newClient).subscribe(() => {
      this.modalService.close()
      createForm.reset()
    }, (error) => {
      console.log('there was an error sending the query', error);
    })
  }

  open(modalCreate): void {
    this.loadInsurances()
    this.modalService.open(modalCreate)
  }

}