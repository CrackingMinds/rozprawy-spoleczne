import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map'

@Injectable()
export class ApiService {
    private prodUrl: string = 'http://api.rs.guselnykov.com';
    private devUrl: string = 'http://rs-api/app_dev.php';
    protected backendUrl: string = '';
    //@TODO: change backendUrl to production

    constructor() {
    }
}
