import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';


declare function init_plugins();

@Component({
    selector: 'app-recovery',
    templateUrl: './recovery.component.html',
    styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent implements OnInit {

    changeToken = '';
    password: string = '';
    confirmPassword: string = '';

    constructor(private router: Router, private activatedRoute: ActivatedRoute) {

        activatedRoute.params.subscribe(params => {
            this.changeToken = params.token;

            if (params.token.length < 10) {
                this.router.navigate(['/login']);
            }
        });
    }

    ngOnInit(): void {
        init_plugins();
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


    }

}
