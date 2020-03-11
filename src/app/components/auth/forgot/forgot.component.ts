import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthApiService } from 'src/app/services/api/auth-api.service';
import { Subscription } from 'rxjs';




@Component({
    selector: 'app-forgot',
    templateUrl: './forgot.component.html',
    styles: []
})
export class ForgotComponent implements OnInit, OnDestroy {

    subscription: Subscription;
    email: string;

    constructor(private router: Router, private authApiService: AuthApiService) { }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {

        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    forgot(form: NgForm) {

        if (form.invalid) {
            return;
        }

        const email = form.value.email;

        this.subscription = this.authApiService.forgot(email)
            .subscribe((resp: boolean) => {
                if (resp) {

                    Swal.fire('Email enviado exitosamente',
                        'Un email ha sido enviado a su correo ' + email + ' con las intrucciones para restablecer su contraseña',
                        'success');

                    this.router.navigate(['/auth']);

                } else {
                    console.log(resp);
                }

            }, (error: any) => {
                if (error.status === 422) {
                    Swal.fire('Error al enviar', 'El email ingresado no existe en nuestros registros', 'error');

                } else {
                    Swal.fire('Ha ocurrido un error', 'Vuelva a intentarlo mas tarde', 'error');
                }

            });
    }



}
