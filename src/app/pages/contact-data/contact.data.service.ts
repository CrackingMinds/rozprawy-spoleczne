import {Injectable} from "@angular/core";
import {ApiService} from "../../services/api.service";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ContactDataService extends ApiService {

    constructor(private http: HttpClient) {
        super();
    }

    getContactInfo() {
        return this.http.get(this.backendUrl + '/contact-info');
    }
}
