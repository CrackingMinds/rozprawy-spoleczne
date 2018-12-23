import { Observable } from 'rxjs';

import { IIndexingInfo } from 'app/models/indexing-info';

export abstract class IndexingInfoService {

    abstract fetchIndexingInfo(): Observable<IIndexingInfo[]>;

}
