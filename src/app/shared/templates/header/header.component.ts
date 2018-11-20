import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { ClientPageState, getClientPageIndexingInfo } from 'app/client/store/client.page.reducers';
import { LoadIndexingInfo } from 'app/store/actions/indexing.info.actions';

import { IIndexing } from 'app/models/indexing';

@Component({
    selector: 'rs-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

    indexingInfo$: Observable<IIndexing[]>;

    constructor(private store: Store<ClientPageState>) {
    }

    ngOnInit() {
      this.indexingInfo$ = this.store.select(getClientPageIndexingInfo);
      this.store.dispatch(new LoadIndexingInfo());
    }

}
