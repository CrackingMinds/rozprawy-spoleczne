import { Observable } from 'rxjs';

import { AsyncComponent } from 'app/client/pages/async.component';

export abstract class PageComponent implements AsyncComponent {

  abstract observePageLoaded(): Observable<void>;
  abstract observePageName(): Observable<string>;

}
