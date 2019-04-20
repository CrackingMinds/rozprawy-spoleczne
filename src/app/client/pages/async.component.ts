import { Observable } from 'rxjs';

export interface AsyncComponent {

  observeContentLoading(): Observable<boolean>;

}
