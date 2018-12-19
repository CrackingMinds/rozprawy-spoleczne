import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map'

@Injectable()
export class ApiService {
    private prodUrl: string = 'http://api.rozprawyspoleczne.edu.pl';
    protected backendUrl: string = this.prodUrl;

    constructor() {
    }
}
