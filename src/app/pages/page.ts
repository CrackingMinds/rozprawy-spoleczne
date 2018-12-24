import { Observable } from 'rxjs';

export interface Page {

  observeContentLoaded(): Observable<void>;
  observePageName(): Observable<string>;

}
