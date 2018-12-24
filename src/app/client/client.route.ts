import { Route } from '@angular/router';
import { Type } from '@angular/core';

import { Page } from 'app/pages/page';

export class ClientRoute implements Route {

  path: string;
  component: Type<Page>;

}
