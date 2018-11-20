import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class ClientContentService {

  private contentLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor() {}

  observeContentLoading(): Observable<boolean> {
    return this.contentLoading$;
  }

  emitContentLoaded(): void {
    this.contentLoading$.next(false);
  }

  destroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
