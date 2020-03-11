import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthApiService } from '../../services/api/auth-api.service';
import { ProfileApiService } from '../../services/api/profile-api.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styles: []
})
export class ProfileComponent implements OnInit {

    user: User = new User();

    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;

    constructor(private authService: AuthApiService, private profileService: ProfileApiService) { }

    ngOnInit(): void {
        this.user = this.authService.loggedUser;
    }

    saveProfile(form: NgForm) {

        if (form.invalid) {
            return;
        }

        if (form.value.name === this.user.name) {
            Swal.fire('Debes cambiar la información', 'Para modificar tu perfil primero debes realizar un cambio', 'info');
            return;
        }

        this.profileService.changeUserInfo(this.user._id, form.value.name)
            .subscribe((user: User) => {
                if (user) {

                    this.user.name = user.name;

                    this.authService.updateLoggedUser(user);

                    Swal.fire('Información Modificada', 'Su información de usuario ha sido modificada exitosamente', 'success');

                } else {
                    console.log(user);
                }

            }, (error: any) => {

                if (error.status === 422) {


                    Swal.fire('Ha ocurrido un error', error.error.content.error.errors[0].msg, 'error');

                } else {
                    Swal.fire('Ha ocurrido un error', 'Vuelva a intentarlo mas tarde', 'error');
                }

            });

    }

    updatePassword(form: NgForm) {

        if (form.invalid) {
            return;
        }

        if (form.value.newPassword !== form.value.confirmNewPassword) {
            Swal.fire('Contraseñas Incorrectas', '"Contraseña" y "Confirmar contraseña" deben ser iguales', 'error');
            return;
        }

        this.currentPassword = form.value.currentPassword;
        this.newPassword = form.value.newPassword;
        this.confirmNewPassword = form.value.confirmNewPassword;

        this.profileService.changePassword(this.user._id, this.currentPassword, this.newPassword, this.confirmNewPassword)
            .subscribe((resp: boolean) => {
                if (resp) {

                    this.currentPassword = form.value.currentPassword = '';
                    this.newPassword = form.value.newPassword = '';
                    this.confirmNewPassword = form.value.confirmNewPassword = '';


                    Swal.fire('Contraseña modificada', 'Su contraseña ha sido modificada exitosamente', 'success');

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
