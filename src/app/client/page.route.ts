import { Route, LoadChildren } from '@angular/router';
import { Type } from '@angular/core';

import { PageComponent } from 'app/client/pages/page.component';

export class PageRoute implements Route {

  path: string;
  component: Type<PageComponent>;

}
