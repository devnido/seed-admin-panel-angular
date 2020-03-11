import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user.model';
import Swal from 'sweetalert2';
import { AuthApiService } from '../../services/api/auth-api.service';
import { Router } from '@angular/router';



@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styles: []
})
export class RegisterComponent implements OnInit {

    email: string;
    name: string;
    password: string;
    confirmPassword: string;
    terms: boolean = false;

    constructor(private router: Router, private authApiService: AuthApiService) { }

    ngOnInit(): void {


    }

    register(form: NgForm) {



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

        const user = new User();
        user.email = form.value.email;
        user.name = form.value.name;
        user.password = form.value.password;
        user.confirmPassword = form.value.password;
        user.password = form.value.password;

        this.authApiService.register(user)
            .subscribe((resp: boolean) => {
                if (resp) {

                    Swal.fire('Cuenta creada', 'Su cuenta de usuario se ha crado exitosamente', 'success');

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
