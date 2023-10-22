import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { lastUpdateJobs } from '../queries/job';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  #worker: Worker;
  #jobSubject: Subject<any> = new Subject();

  constructor(private apollo: Apollo) {
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
    this.getLastUpdatedJobs();
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

  getLastUpdatedJobs(): Observable<any> {
    this.#worker.postMessage({ type: 'job-update-subscription' });
    return this.#jobSubject.asObservable();
  }
}
