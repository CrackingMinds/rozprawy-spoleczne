import {Injectable} from "@angular/core";
import {ApiService} from "../../services/api.service";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SubscriptionsService extends ApiService {

    constructor(private http: HttpClient) {
        super();
    }

    getSubscriptionsInfo() {
        return this.http.get(this.backendUrl + '/subscriptions');
    }
}
