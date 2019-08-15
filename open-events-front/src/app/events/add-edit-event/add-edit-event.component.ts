import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { Event } from "../../models/event";
import { EventService } from "../../core/event.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { User } from "../../models/user";
import { Validators } from '@angular/forms';

@Component({
  selector: "oevents-add-edit-event",
  templateUrl: "./add-edit-event.component.html",
  styleUrls: ["./add-edit-event.component.scss"]
})
export class AddEditEventComponent implements OnInit {
  addEditForm: FormGroup;
  event: Event;

  validationMessages = {
    title: { 
        required : 'The Title field is required'
    },
    date: {
        required : 'The Date field is required'
    },
    phone : {
        required : 'The field is required'
    }
}

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  get f() { return this.addEditForm.controls; }

  ngOnInit() {
    const id = this.route.snapshot.params["id"];

    if (id) {
      this.eventService.getEvent(id).subscribe((event: Event) => {
        console.log(event);
        this.event = event;
        this.createForm();
      });
    } else {
      this.createForm();
    }
  }

  createForm() {
    this.addEditForm = this.fb.group({
      title: new FormControl(
        this.event?this.event.title:'', [
          Validators.required]),
      location: new FormControl(this.event?this.event.location:'', [
        Validators.required, 
        Validators.minLength(2), 
        Validators.maxLength(25)]),
      date: new FormControl(this.event?this.event.date:'', [Validators.required]),
      description: new FormControl(this.event?this.event.description:'', [
          Validators.required, 
          Validators.minLength(10), 
          Validators.maxLength(400)]),
      addedBy: this.event?this.event.addedBy:'',
      id: this.event?this.event.id:''
    });
  }

  onSubmit() {
    const user: User = JSON.parse(localStorage.getItem("user"));

    this.event = this.addEditForm.value;
    this.event.addedBy = user.email;
    
    if (this.event.id) {
      this.eventService.updateEvent(this.event).subscribe((event: Event) => {
        console.log(event);
        this.addEditForm.reset();
        this.router.navigate(["/events"]);
      });
    } else {
      this.eventService.addEvent(this.event).subscribe((event: Event) => {
        console.log(event);
        this.addEditForm.reset();
        this.router.navigate(["/events"]);
      });
    }
  }
}