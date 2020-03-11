import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthApiService } from '../../services/api/auth-api.service';
import Swal from 'sweetalert2';




@Component({
    selector: 'app-forgot',
    templateUrl: './forgot.component.html',
    styles: []
})
export class ForgotComponent implements OnInit {


    email: string;

    constructor(private router: Router, private authApiService: AuthApiService) { }

    ngOnInit(): void {


    }

    forgot(form: NgForm) {

        if (form.invalid) {
            return;
        }

        const email = form.value.email;

        this.authApiService.forgot(email)
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
