
import { ModalService } from './../shared/services/modal.service';
import { Component, OnInit } from '@angular/core';

import { TimetableService } from './../shared/services/timetable.service';
import { Timetable } from './../shared/models/timetable.model';
import { ClientService } from './../shared/services/client.service';
import { Client } from './../shared/models/client.model';
import { TreatmentService } from './../shared/services/treatment.service';
import { Treatment } from './../shared/models/treatment.model';
import { UserService } from './../shared/services/user.service';
import { User } from './../shared/models/user.model';
import { PricingService } from './../shared/services/pricing.service';
import { Pricing } from './../shared/models/pricing.model';

@Component({
  selector: 'app-timetables',
  templateUrl: './timetables.component.html',
  styleUrls: ['./timetables.component.css']
})
export class TimetablesComponent implements OnInit {

  timetables: Array<Timetable>
  clients: Array<Client>
  pricings: Array<Pricing>
  treatments: Array<Treatment>
  users: Array<User>
  newTimetable: Timetable = new Timetable()
  datedate: any
  datetime: any
  patternDate: string
  patternTime: string
  patternClient: string
  patternTreatment: string
  patternUser: string
  patternNotes: string
  patternInfo: string
  chosenClient: Client = new Client()

  constructor(
    private timetableService: TimetableService,
    private clientService: ClientService,
    private treatmentService: TreatmentService,
    private userService: UserService,
    private pricingService: PricingService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.loadTimetables()
    this.chosenClient.insurance = ''
  }

  loadTimetables(): void {
    this.timetableService.getTimetables().subscribe(({ data, loading }) => {
      this.timetables = data.getTimetables;
    });
  }

  loadTreatments(): void {
    this.treatmentService.getTreatments().subscribe(({ data, loading }) => {
      this.treatments = data.getTreatments;
    });
  }

  loadClients(): void {
    this.clientService.getClients().subscribe(({ data, loading }) => {
      this.clients = data.getClients;
    });
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(({ data, loading }) => {
      this.users = data.getUsers;
    });
  }

  loadPricings(): void {
    this.pricingService.getPricings().subscribe(({ data, loading }) => {
      this.pricings = data.getPricings;
    });
  }

  onSubmitCreate(createForm): void {
    this.newTimetable.client = this.chosenClient._id
    this.timetableService.createTimetable(this.newTimetable).subscribe(data => {
      this.loadTimetables()
      createForm.reset()
      window.location.reload()
    })
  }

  open(modalCreate): void {
    this.loadClients()
    this.loadTreatments()
    this.loadUsers()
    this.loadPricings()
    this.modalService.open(modalCreate)
  }

}
