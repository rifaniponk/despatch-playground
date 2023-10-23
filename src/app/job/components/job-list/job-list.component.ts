import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
})
export class JobListComponent implements OnInit {
  jobs: Job[] = [];

  constructor(private jobSvc: JobService) {}

  ngOnInit() {
    // this.jobSvc.fetchAllJobs().subscribe();
  }
}
