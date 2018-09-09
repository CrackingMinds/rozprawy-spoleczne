import {Injectable} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {INewIssueData} from "../../models/interfaces";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class IssueService extends ApiService {
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')
        })
    };
    constructor(private http: HttpClient) {
        super();
    }

    getIssue(id) {
        return this.http.get(this.backendUrl + '/issues/' + id);
    }

    getCurrentIssue() {
        return this.http.get(this.backendUrl + '/issues/current');
    }

    getAllIssues() {
        return this.http.get(this.backendUrl + '/issues');
    }

    getAllIssuesWithArticles() {
        return this.http.get(this.backendUrl + '/issues/articles');
    }

    postIssue(issueData: INewIssueData) {
        return this.http.post(this.backendUrl + '/issues', issueData, this.httpOptions);
    }

    putIssueData(issueId: string, updatedIssueData: any) {
        return this.http.put(this.backendUrl + '/issues/' + issueId, updatedIssueData, this.httpOptions);
    }

    deleteIssue(issueId: string) {
        return this.http.delete(this.backendUrl + '/issues/' + issueId, this.httpOptions);
    }
}
