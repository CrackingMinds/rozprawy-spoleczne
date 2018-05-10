import {ApiService} from "../../services/api.service";
import {Http} from "@angular/http";
import {Injectable} from "@angular/core";

@Injectable()
export class EditorialScientificBoardService extends ApiService {

    constructor(private http: Http) {
        super();
    }

    getEditorialBoardMembers() {
        return this.http.get(this.backendUrl + '/boards/editorial')
            .map(res => res.json());
    }

    getScientificBoardMembers() {
        return this.http.get(this.backendUrl + '/boards/scientific')
            .map(res => res.json());
    }
}