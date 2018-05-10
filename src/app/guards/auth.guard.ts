import {Injectable} from "@angular/core";
import {Router, CanActivate} from "@angular/router";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService,
                private router: Router) {
    }

    canActivate() {
        console.log("logged in: " + this.authService.loggedIn());
        if (this.authService.loggedIn()) {
            return true;
        }
        else {
            this.router.navigate(['/sign-in']);
            return false;
        }
    }
}