import {ApiService} from "../../services/api.service";
import {Injectable} from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EditorialScientificBoardService extends ApiService {

    constructor(private http: HttpClient) {
        super();
    }

    getEditorialBoardMembers() {
        return this.http.get(this.backendUrl + '/boards/editorial');
    }

    getScientificBoardMembers() {
        return this.http.get(this.backendUrl + '/boards/scientific');
    }
}
