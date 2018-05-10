import {Component, OnInit} from '@angular/core';
import {SpinnerService} from "../../services/spinner/spinner.service";
import {ValidateService} from "../validate.service";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {PageBase} from "../../shared/page.base";
import {PageNameService} from "../../shared/services/page.name.service";

@Component({
    selector: 'sign-in',
    templateUrl: './signin.component.html'
})
export class SigninComponent extends PageBase implements OnInit {
    email: string;
    password: string;

    constructor(private spinnerService: SpinnerService,
                private validateService: ValidateService,
                private authService: AuthService,
                private router: Router,
                private pageNameService: PageNameService) {
        super(
            spinnerService,
            pageNameService
        );
    }

    ngOnInit() {
        this.asyncAction = this.asyncPlaceholder();
        let self = this;
        this.asyncAction
            .then(function () {
                self.changePageName('Logowanie');
            });
        super.ngOnInit();
    }

    asyncPlaceholder(): Promise<any> {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve();
            }, 2000);
        });
    }

    onSignInSubmit() {
        const user = {
            email: this.email,
            password: this.password
        };

        // Required Fields
        if (!this.validateService.validateLogin(user)) {
            console.log("Please fill in all fields");
            return false;
        }

        // Validate Email
        if (!this.validateService.validateEmail(user.email)) {
            console.log("Please use a valid email");
            return false;
        }

        this.authService.authenticateUser(user)
            .subscribe(data => {
                if (data.success) {
                    this.authService.storeUserData(data.token, data.user);
                    this.router.navigate(['/admin/dashboard']);
                }
                else {
                    console.log(data.message);
                    // this.router.navigate(['/sign-in']);
                }
            });
    }
}
