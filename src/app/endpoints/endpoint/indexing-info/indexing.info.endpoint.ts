import { Observable } from 'rxjs';

import { IIndexingInfo } from 'app/models/indexing-info';

export abstract class IndexingInfoEndpoint {

  abstract getIndexingInfo(): Observable<IIndexingInfo[]>;

}
