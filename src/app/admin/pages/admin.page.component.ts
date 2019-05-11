import { PageComponent } from 'app/client/pages/page.component';

export abstract class AdminPageComponent extends PageComponent {

  isDashboard(): boolean {
    return false;
  };

}
