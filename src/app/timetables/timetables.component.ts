
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

@Component({
  selector: 'app-timetables',
  templateUrl: './timetables.component.html',
  styleUrls: ['./timetables.component.css']
})
export class TimetablesComponent implements OnInit {

  timetables: Array<Timetable>
  clients: Array<Client>
  treatments: Array<Treatment>
  users: Array<User>
  newTimetable: Timetable = new Timetable
  datedate: any
  datetime: any
  patternDate: string
  patternTime: string
  patternClient: string
  patternTreatment: string
  patternUser: string
  patternNotes: string
  patternInfo: string

  constructor(
    private TimetableService: TimetableService,
    private clientService: ClientService,
    private treatmentService: TreatmentService,
    private userService: UserService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.loadTimetables()
  }

  loadTimetables(): void {
    this.TimetableService.getTimetables().subscribe(({ data, loading }) => {
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

  onSubmitCreate(createForm): void {
    console.log(this.newTimetable)
    this.TimetableService.createTimetable(this.newTimetable).subscribe(data => {
      this.loadTimetables()
      createForm.reset()
      window.location.reload()
    })
  }

  open(modalCreate): void {
    this.loadClients()
    this.loadTreatments()
    this.loadUsers()
    this.modalService.open(modalCreate)
  }

}
