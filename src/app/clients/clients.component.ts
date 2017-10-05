import { Component, OnInit } from '@angular/core';

import { ClientService } from './../shared/services/client.service';
import { Client } from './../shared/models/client.model';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {

  loading = true
  clients: Array<Client>
  isEditing: Boolean = false
  newClient: Client = new Client();

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.loadClients()
  }

  loadClients(): void {
    this.clientService.getClients().subscribe(({ data, loading }) => {
      this.clients = data.getClients;
      this.loading = loading;
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  ngForTrackBy(index: number, Client: Client): string { return Client._id; }

  onSubmitCreateClient(createClientForm) {
    this.clientService.createClient(this.newClient).subscribe(data => {
      this.loadClients()
      this.toggleEdit()
      createClientForm.reset()
      window.location.reload()
    })
  }
}
