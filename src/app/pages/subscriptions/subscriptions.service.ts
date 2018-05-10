import {Injectable} from "@angular/core";
import {ApiService} from "../../services/api.service";
import {Http} from "@angular/http";

@Injectable()
export class SubscriptionsService extends ApiService {

    constructor(private http: Http) {
        super();
    }

    getSubscriptionsInfo() {
        return this.http.get(this.backendUrl + '/subscriptions')
            .map(res => res.json());
    }
}