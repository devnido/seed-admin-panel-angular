import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthApiService } from 'src/app/services/api/auth-api.service';
import Swal from 'sweetalert2';
import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

    email: string;
    rememberMe: boolean = false;
    subscription: Subscription;
    resolvedCaptcha: string;
    siteApiKeyCaptcha: string = '';
    loading: boolean = false;

    constructor(private router: Router, private authApiService: AuthApiService) {
        this.loadSiteApiKeyCaptcha();
    }

    ngOnInit(): void {
        this.getRemember();
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    login(form: NgForm) {
        this.loading = true;

        if (form.invalid) {
            return;
        }

        if (!this.resolvedCaptcha) {
            Swal.fire('No soy un robot', 'Debe resolver el captcha para demostrar que no es un robot', 'warning');
            return;
        }

        const user = new User();
        user.email = form.value.email;
        user.password = form.value.password;

        this.rememberMe = form.value.rememberMe;

        this.subscription = this.authApiService.login(user, this.resolvedCaptcha)
            .subscribe((resp: boolean) => {
                if (resp) {

                    this.setRemenber(this.rememberMe, user.email);

                    this.router.navigate(['/bienvenido']);

                } else {
                    console.log(resp);
                }
                this.loading = false;
            }, (error: any) => {
                this.loading = false;
                if (error.status === 401) {
                    Swal.fire('Error al ingresar', 'Usuario o contraseña ingresados son incorrectos', 'error');
                } else {
                    Swal.fire('Ha ocurrido un error', 'Vuelva a intentarlo mas tarde', 'error');
                }

            });

    }

    resolved(captchaResponse: string) {
        this.resolvedCaptcha = captchaResponse;
    }

    private setRemenber(remember: boolean, email: string) {

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

    private loadSiteApiKeyCaptcha() {
        this.siteApiKeyCaptcha = environment.siteApiKeyCaptcha;

    }

}
