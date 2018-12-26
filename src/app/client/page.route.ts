import { Route, LoadChildren } from '@angular/router';
import { Type } from '@angular/core';

import { Page } from 'app/pages/page';

export class PageRoute implements Route {

  path: string;
  component: Type<Page>;

}
