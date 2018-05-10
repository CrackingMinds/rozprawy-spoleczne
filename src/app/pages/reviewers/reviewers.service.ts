import {ApiService} from "../../services/api.service";
import {Http} from "@angular/http";
import {Injectable} from "@angular/core";

@Injectable()
export class ReviewersService extends ApiService {

    constructor(private http: Http) {
        super();
    }

    getReviewers() {
        return this.http.get(this.backendUrl + '/reviewers')
            .map(res => res.json());
    }
}