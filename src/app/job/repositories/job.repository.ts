import { Injectable } from '@angular/core';
import { createStore, withProps } from '@ngneat/elf';
import {
  withEntities,
  selectAllEntities,
  withActiveId,
  selectActiveEntity,
  setActiveId,
  setEntities,
} from '@ngneat/elf-entities';
import { joinRequestResult } from '@ngneat/elf-requests';
import { RequestResult } from '@ngneat/elf-requests/src/lib/requests-result';
import { Observable } from 'rxjs';
import {
  withRequestsStatus,
  createRequestsStatusOperator,
} from '@ngneat/elf-requests';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface JobProps {}

@Injectable({
  providedIn: 'root',
})
export class JobRepository {
  private readonly store;

  readonly activeJob$: Observable<Job | undefined>;
  readonly jobs$: Observable<Job[]>;
  readonly jobsWithRequestResult$: Observable<RequestResult & { data: Job[] }>;

  trackJobsRequestsStatus;

  constructor() {
    this.store = this.createStore();
    this.trackJobsRequestsStatus = createRequestsStatusOperator(this.store);
    console.log('this.trackJobsRequestsStatus', this.trackJobsRequestsStatus);
    this.jobs$ = this.store.pipe(selectAllEntities());
    this.activeJob$ = this.store.pipe(selectActiveEntity());
    this.jobsWithRequestResult$ = this.store.pipe(
      selectAllEntities(),
      joinRequestResult([this.entitiesRequestKey])
    );
  }

  setActiveId(id: Job['job_id']) {
    this.store.update(setActiveId(id));
  }

  setEntities(jobs: Job[]) {
    this.store.update(setEntities(jobs));
  }

  get entitiesRequestKey() {
    return 'JobRepository.entities';
  }

  private createStore(): typeof store {
    const store = createStore(
      { name: 'job' },
      withProps<JobProps>({}),
      withEntities<Job, 'job_id'>({ idKey: 'job_id' }),
      withRequestsStatus<'jobs'>(),
      withActiveId()
    );

    return store;
  }
}
