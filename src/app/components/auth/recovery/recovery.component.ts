import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthApiService } from 'src/app/services/api/auth-api.service';
import { Subscription } from 'rxjs';



@Component({
    selector: 'app-recovery',
    templateUrl: './recovery.component.html',
    styles: []
})
export class RecoveryComponent implements OnInit, OnDestroy {

    changeToken = '';
    password: string = '';
    confirmPassword: string = '';
    subscription: Subscription;

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private authApiService: AuthApiService) {

        activatedRoute.params.subscribe(params => {
            this.changeToken = params.token;

            if (params.token.length < 10) {
                this.router.navigate(['/auth']);
            }
        });
    }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    recovery(form: NgForm) {

        if (form.invalid) {
            return;
        }

        if (form.value.password !== form.value.confirmPassword) {
            Swal.fire('Contraseñas Incorrectas', '"Contraseña" y "Confirmar contraseña" deben ser iguales', 'error');
            return;
        }

        this.password = form.value.password;
        this.confirmPassword = form.value.confirmPassword;

        this.subscription = this.authApiService.recovery(this.password, this.confirmPassword, this.changeToken)
            .subscribe((resp: boolean) => {
                if (resp) {

                    Swal.fire('Contraseña modificada', 'Su contraseña ha sido modificada exitosamente', 'success');

                    this.router.navigate(['/auth']);

                } else {
                    console.log(resp);
                }

            }, (error: any) => {
                if (error.status === 422) {

                    Swal.fire('Ha ocurrido un error', error.error.content.error.errors[0].msg, 'error');

                } else {
                    Swal.fire('Ha ocurrido un error', 'Vuelva a intentarlo mas tarde', 'error');
                }

            });


    }

}
