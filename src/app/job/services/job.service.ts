import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  #worker: Worker;
  #jobSubject: Subject<any> = new Subject();

  constructor() {
    this.#worker = new Worker(
      new URL('../workers/job-update.worker', import.meta.url)
    );
    this.#worker.onmessage = (event) => {
      const { type, payload } = event.data;

      if (type === 'data') {
        this.#jobSubject.next(payload);
      }
    };

    this.getLastUpdatedJobs();
  }

  getLastUpdatedJobs(): Observable<any> {
    this.#worker.postMessage({ type: 'job-update' });
    return this.#jobSubject.asObservable();
  }
}
