import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {ApiService} from "../../services/api.service";

@Injectable()
export class ArticleService extends ApiService {

    constructor(private http: Http) {
        super();
    }

    getArticle(id) {
        return this.http.get(this.backendUrl + '/articles/' + id)
            .map(res => res.json());
    }
}
