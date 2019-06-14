import { Component, OnInit } from '@angular/core';

import { EventService } from "../../core/event.service";
import { UserService } from "../../core/user.service";

import { Event } from '../../models/event';
import { User } from 'src/app/models/user';

@Component({
  selector: 'oevents-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  events: Event[];
  selectedEvent: Event;
  displayedColumns: string[] = ["Date", "Location", "Title"];
  user: User;
  isAuthenticated: boolean;

  constructor(
    private eventService: EventService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.checkUser();
    this.getEvents();
  }

  onSelectEvent(event: Event) {
    this.selectedEvent = event;
  }

  getEvents() {
    this.eventService.getEvents().subscribe((events: Event[]) => {
      this.events = events;
      this.selectedEvent = events[0];
    });
  }

  checkUser() {
    this.isAuthenticated = this.userService.checkUser();
    if(this.isAuthenticated) {
      this.user = JSON.parse(localStorage.getItem("user"));
    }
  }

}
