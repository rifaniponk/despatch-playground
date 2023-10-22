import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverListComponent } from './components/driver-list/driver-list.component';
import { JobListComponent } from './components/job-list/job-list.component';

@NgModule({
  declarations: [DriverListComponent, JobListComponent],
  imports: [CommonModule],
})
export class JobModule {}
