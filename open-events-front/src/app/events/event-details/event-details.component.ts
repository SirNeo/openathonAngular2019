import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/event';
import { ActivatedRoute, Router } from "@angular/router";
import { EventService } from "../../core/event.service";
import { UserService } from 'src/app/core/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'oevents-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  event: Event;
  user: User;
  isAuthenticated: boolean;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.checkUser();
    const id = this.route.snapshot.params["id"];
    this.eventService.getEvent(id).subscribe((event: Event) => {
      console.log(event);
      this.event = event;
    });
  }

  deleteEvent(event: Event) {
    console.log(event);
    this.eventService.deleteEvent(event.id).subscribe(() => {
      console.log("Event Removed");
    });
    this.router.navigate(["/events"]);
  }

  checkUser() {
    this.isAuthenticated = this.userService.checkUser();
    if(this.isAuthenticated) {
      this.user = JSON.parse(localStorage.getItem("user"));
    }
  }
}
