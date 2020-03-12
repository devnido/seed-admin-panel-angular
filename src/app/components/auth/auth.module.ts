import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ForgotComponent } from './forgot/forgot.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';

import { RecaptchaModule } from 'ng-recaptcha';



@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        ForgotComponent,
        RecoveryComponent,
        AuthComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RecaptchaModule,
        AuthRoutingModule
    ]
})
export class AuthModule { }
