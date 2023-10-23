import { Injectable } from '@angular/core';
import { Observable, Subject, map, tap } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { lastUpdateJobs } from '../queries/job';
import { HttpClient } from '@angular/common/http';
import { JobRepository } from '../repositories/job.repository';
import { trackRequestResult } from '@ngneat/elf-requests';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  #worker: Worker;
  #jobSubject: Subject<any> = new Subject();

  constructor(
    private apollo: Apollo,
    private http: HttpClient,
    private jobRepo: JobRepository
  ) {
    this.#worker = new Worker(
      new URL('../workers/job-update.worker', import.meta.url)
    );
    this.#worker.onmessage = (event) => {
      const { type, payload } = event.data;

      if (type === 'data') {
        this.#jobSubject.next(payload);
      }
    };

    this.initSubscription();
    setTimeout(() => {
      this.fetchAllJobs();
    }, 2000);
  }

  initSubscription(): void {
    this.apollo
      .subscribe({
        query: lastUpdateJobs,
      })
      .subscribe((data) => {
        console.log('data', data);
      });
  }

  fetchAllJobs() {
    const a = this.http
      .get<{ job: Job[] }>('/jobs')
      .pipe(
        map((resp) => resp.job),
        tap((jobs) => this.jobRepo.setEntities(jobs))
      )
      .subscribe((jobs) => {
        console.log('jobs', jobs);
      });
    console.log('a', a);
  }

  getLastUpdatedJobs(): Observable<any> {
    this.#worker.postMessage({ type: 'job-update-subscription' });
    return this.#jobSubject.asObservable();
  }
}
