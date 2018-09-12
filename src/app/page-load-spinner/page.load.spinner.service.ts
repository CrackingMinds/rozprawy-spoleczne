import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PageLoadSpinnerService {

  private spinnerState$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  showSpinner(): void {
    this.spinnerState$.next(true);
  }

  hideSpinner(): void {
    this.spinnerState$.next(false);
  }

  observeSpinnerStateChange(): Observable<boolean> {
    return this.spinnerState$.asObservable();
  }
}
