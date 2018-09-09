import {ApiService} from "../../services/api.service";
import {Injectable} from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ReviewersService extends ApiService {

    constructor(private http: HttpClient) {
        super();
    }

    getReviewers() {
        return this.http.get(this.backendUrl + '/reviewers');
    }
}
