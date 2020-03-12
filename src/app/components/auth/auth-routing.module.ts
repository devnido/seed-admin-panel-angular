import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotComponent } from './forgot/forgot.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
    {
        path: '', component: AuthComponent,
        children: [
            {
                path: 'login', component: LoginComponent, data: { titulo: 'Login' }
            },
            {
                path: 'register', component: RegisterComponent, data: { titulo: 'Registrarse' }
            },
            {
                path: 'forgot', component: ForgotComponent, data: { titulo: 'Olvidó Contraseña' }
            },
            {
                path: 'recovery/:token', component: RecoveryComponent, data: { titulo: 'Recuperar Contraseña' }
            },
            {
                path: '', redirectTo: '/auth/login', pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
