import {Component, OnInit} from '@angular/core';
import {SpinnerService} from "../../services/spinner/spinner.service";
import {ValidateService} from "../validate.service";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'sign-up',
    templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
    name: string;
    email: string;
    password: string;

    constructor(private spinnerService: SpinnerService,
                private validateService: ValidateService,
                private authService: AuthService,
                private router: Router) {
    }

    ngOnInit() {
        this.spinnerService.toggleSpinner();
    }

    onSignUpSubmit() {
        const user = {
            name: this.name,
            email: this.email,
            password: this.password
        };

        // Required Fields
        if (!this.validateService.validateRegister(user)) {
            console.log("Please fill in all fields");
            return false;
        }

        // Validate Email
        if (!this.validateService.validateEmail(user.email)) {
            console.log("Please use a valid email");
            return false;
        }

        // Register user
        this.authService.registerUser(user)
            .subscribe((data: any) => {
                if (data.success) {
                    console.log("You are now registered and can log in");
                    this.router.navigate(['/login']);
                }
                else {
                    console.log("Something went wrong");
                    this.router.navigate(['/signup']);
                }
            });
    }

}
