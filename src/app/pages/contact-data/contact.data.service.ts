import {Injectable} from "@angular/core";
import {ApiService} from "../../services/api.service";
import {Http} from "@angular/http";

@Injectable()
export class ContactDataService extends ApiService {

    constructor(private http: Http) {
        super();
    }

    getContactInfo() {
        return this.http.get(this.backendUrl + '/contact-info')
            .map(res => res.json());
    }
}