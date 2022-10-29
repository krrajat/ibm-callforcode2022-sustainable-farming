import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService, AuthenticationService, AddMachinesService } from '@/_services';

@Component({ templateUrl: 'addMachines.component.html' })
export class AddMachinesComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService,
        private addMachinesService: AddMachinesService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            name: ['', Validators.required],
            picture_url: ['', Validators.required],
            location:  ['', Validators.required],
            category_id:  ['', Validators.required],
            vendor_id:  ['', Validators.required],
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.addMachinesService.addMachine(this.f.name.value,this.f.picture_url.value,this.f.location.value,this.f.category_id.value, this.f.vendor_id.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Add Machine successful', true);
                    this.router.navigate(['/listMachines']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
