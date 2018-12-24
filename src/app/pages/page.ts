import { Observable } from 'rxjs';

import { AsyncComponent } from 'app/pages/async.component';

export abstract class Page implements AsyncComponent {

  abstract observeContentLoaded(): Observable<void>;
  abstract observePageName(): Observable<string>;

}
