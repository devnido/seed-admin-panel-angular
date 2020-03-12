import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthApiService } from 'src/app/services/api/auth-api.service';
import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';



@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

    email: string;
    name: string;
    password: string;
    confirmPassword: string;
    terms: boolean = false;
    subscription: Subscription;
    resolvedCaptcha: string;
    siteApiKeyCaptcha: string = '';
    loading: boolean = false;

    constructor(private router: Router, private authApiService: AuthApiService) {
        this.loadSiteApiKeyCaptcha();
    }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    register(form: NgForm) {
        this.loading = true;


        if (form.invalid) {
            return;
        }

        if (form.value.password !== form.value.confirmPassword) {
            Swal.fire('Contraseñas Incorrectas', '"Contraseña" y "Confirmar contraseña" deben ser iguales', 'warning');
            return;
        }

        if (!form.value.terms) {
            Swal.fire('Aceptar términos', 'Para registrarse en nuestra plataforma debe aceptar los términos', 'warning');
            return;
        }

        if (!this.resolvedCaptcha) {
            Swal.fire('No soy un robot', 'Debe resolver el captcha para demostrar que no es un robot', 'warning');
            return;
        }

        const user = new User();
        user.email = form.value.email;
        user.name = form.value.name;
        user.password = form.value.password;
        user.confirmPassword = form.value.password;
        user.password = form.value.password;


        this.subscription = this.authApiService.register(user, this.resolvedCaptcha)
            .subscribe((resp: boolean) => {
                if (resp) {

                    Swal.fire('Cuenta creada', 'Su cuenta de usuario se ha crado exitosamente', 'success');

                    this.router.navigate(['/auth']);

                } else {
                    console.log(resp);
                }
                this.loading = false;

            }, (error: any) => {
                this.loading = false;
                if (error.status === 422) {
                    Swal.fire('Ha ocurrido un error', error.error.content.error.errors[0].msg, 'error');
                } else {
                    Swal.fire('Ha ocurrido un error', 'Vuelva a intentarlo mas tarde', 'error');
                }

            });

    }

    resolved(captchaResponse: string) {
        this.resolvedCaptcha = captchaResponse;
    }
    private loadSiteApiKeyCaptcha() {
        this.siteApiKeyCaptcha = environment.siteApiKeyCaptcha;

    }

}
