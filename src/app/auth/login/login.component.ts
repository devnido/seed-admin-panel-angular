import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user.model';
import { AuthApiService } from 'src/app/services/api/auth-api.service';
import Swal from 'sweetalert2';

declare function init_plugins();

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    email: string;
    rememberMe: boolean = false;

    constructor(private router: Router, private authApiService: AuthApiService) { }

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

        this.authApiService.login(user)
            .subscribe((resp: boolean) => {
                if (resp) {

                    this.setRemenber(this.rememberMe, user.email);

                    this.router.navigate(['/bienvenido']);

                } else {
                    console.log(resp);
                }

            }, (error: any) => {
                if (error.status === 401) {
                    Swal.fire('Error al ingresar', 'Usuario o contraseña ingresados son incorrectos', 'error');
                } else {
                    Swal.fire('Ha ocurrido un error', 'Vuelva a intentarlo mas tarde', 'error');
                }

            });

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
