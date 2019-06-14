import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { SharedModule } from "../shared/shared.module";

// Components
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { AddEditEventComponent } from './add-edit-event/add-edit-event.component';

@NgModule({
  declarations: [EventListComponent, EventDetailsComponent, AddEditEventComponent],
  imports: [
    CommonModule, SharedModule
  ]
})
export class EventsModule { }
