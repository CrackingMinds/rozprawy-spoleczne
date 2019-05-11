import { Observable } from 'rxjs';

export interface AsyncComponent {

  observePageLoaded(): Observable<void>;

}
