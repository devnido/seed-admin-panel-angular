import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user.model';
import Swal from 'sweetalert2';


declare function init_plugins();

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    email: string;
    name: string;
    password: string;
    confirmPassword: string;
    terms: boolean = false;

    constructor() { }

    ngOnInit(): void {

        init_plugins();
    }

    register(form: NgForm) {
        if (form.invalid) {
            return;
        }

        if (form.value.password !== form.value.confirmPassword) {
            Swal.fire('Contraseñas Incorrectas', '"Contraseña" y "Confirmar contraseña" deben ser iguales', 'error');
            return;
        }

        const user = new User();
        user.email = form.value.email;
        user.name = form.value.name;
        user.password = form.value.password;
        user.confirmPassword = form.value.password;
        user.password = form.value.password;





    }

}
