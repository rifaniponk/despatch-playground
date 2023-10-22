import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverListComponent } from './components/driver-list/driver-list.component';
import { JobListComponent } from './components/job-list/job-list.component';
import { JobRoutingModule } from './job-routing.module';

@NgModule({
  declarations: [DriverListComponent, JobListComponent],
  imports: [CommonModule, JobRoutingModule],
})
export class JobModule {}
