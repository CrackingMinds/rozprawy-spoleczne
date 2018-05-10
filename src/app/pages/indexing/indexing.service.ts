import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {ApiService} from "../../services/api.service";

@Injectable()
export class IndexingService extends ApiService {

    constructor(private http: Http) {
        super();
    }

    getIndexingInfo() {
        return this.http.get(this.backendUrl + '/indexing')
            .map(res => res.json());
    }
}
