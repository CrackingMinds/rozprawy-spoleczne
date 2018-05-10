import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map'

@Injectable()
export class ApiService {
    private prodUrl: string = 'http://api.rs.guselnykov.com';
    private devUrl: string = 'http://rs-api/app_dev.php';
    protected backendUrl: string = this.devUrl;
    //@TODO: change backendUrl to production

    constructor() {
    }
}
