import {Injectable} from '@angular/core';
import {ApiService} from "../../services/api.service";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ArticleService extends ApiService {

    constructor(private http: HttpClient) {
        super();
    }

    getArticle(id) {
        return this.http.get(this.backendUrl + '/articles/' + id);
    }
}
