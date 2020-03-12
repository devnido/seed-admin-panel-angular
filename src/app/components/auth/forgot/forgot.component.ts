import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthApiService } from 'src/app/services/api/auth-api.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';




@Component({
    selector: 'app-forgot',
    templateUrl: './forgot.component.html',
    styles: []
})
export class ForgotComponent implements OnInit, OnDestroy {

    subscription: Subscription;
    email: string;
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

    forgot(form: NgForm) {
        this.loading = true;

        if (form.invalid) {
            return;
        }

        if (!this.resolvedCaptcha) {
            Swal.fire('No soy un robot', 'Debe resolver el captcha para demostrar que no es un robot', 'warning');
            return;
        }

        const email = form.value.email;

        this.subscription = this.authApiService.forgot(email, this.resolvedCaptcha)
            .subscribe((resp: boolean) => {
                if (resp) {

                    Swal.fire('Email enviado exitosamente',
                        'Un email ha sido enviado a su correo ' + email + ' con las intrucciones para restablecer su contraseña',
                        'success');

                    this.router.navigate(['/auth']);

                } else {
                    console.log(resp);
                }
                this.loading = false;

            }, (error: any) => {
                if (error.status === 422) {
                    this.loading = false;
                    Swal.fire('Error al enviar', 'El email ingresado no existe en nuestros registros', 'error');

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
