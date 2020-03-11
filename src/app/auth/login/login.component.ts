import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user.model';

declare function init_plugins();

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    email: string;
    rememberMe: boolean = false;

    constructor(public router: Router) { }

    ngOnInit(): void {

        init_plugins();
        this.getRemember();
    }

    login(form: NgForm) {

        if (form.invalid) {
            return;
        }

        const user = new User();
        user.email = form.value.email;
        user.password = form.value.password;

        this.rememberMe = form.value.rememberMe;

    }

    private setRemenber(remember: boolean, email: string) {

        console.log('remember', remember);
        console.log('email', email);

        if (remember) {
            localStorage.setItem('userEmail', email);
        } else {
            localStorage.removeItem('userEmail');
        }

    }

    private getRemember() {
        this.email = localStorage.getItem('userEmail') || '';
        if (this.email.length > 1) {
            this.rememberMe = true;
        }

    }

}
