import {Injectable} from '@angular/core';
import {ApiService} from "../../services/api.service";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class IndexingService extends ApiService {

    constructor(private http: HttpClient) {
        super();
    }

    getIndexingInfo() {
        return this.http.get(this.backendUrl + '/indexing');
    }
}
