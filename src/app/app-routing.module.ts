import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ForgotComponent } from './auth/forgot/forgot.component';
import { RecoveryComponent } from './auth/recovery/recovery.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './auth/register/register.component';


const routes: Routes = [
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'register', component: RegisterComponent
    },
    {
        path: 'forgot', component: ForgotComponent
    },
    {
        path: 'recovery/:token', component: RecoveryComponent
    },
    {
        path: '', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
    },

    {
        path: '**', component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
