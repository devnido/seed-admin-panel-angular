import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

declare function init_plugins();


@Component({
    selector: 'app-forgot',
    templateUrl: './forgot.component.html',
    styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {


    email: string;

    constructor(private router: Router) { }

    ngOnInit(): void {

        init_plugins();
    }

    forgot(form: NgForm) {

        if (form.invalid) {
            return;
        }

        const email = form.value.email;

    }

}
