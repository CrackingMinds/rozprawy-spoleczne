import { Observable } from 'rxjs';

export interface AsyncComponent {

  observeContentLoaded(): Observable<void>;

}
