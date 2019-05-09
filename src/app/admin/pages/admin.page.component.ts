import { Observable, of } from 'rxjs';

import { PageComponent } from 'app/client/pages/page.component';

export abstract class AdminPageComponent extends PageComponent {

  isDashboard(): boolean {
    return false;
  };

  observeContentLoading(): Observable<boolean> {
    return of(false);
  }

}
