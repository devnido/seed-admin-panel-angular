import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';



const routes: Routes = [
    {
        path: 'login', redirectTo: '/auth/login'
    },
    {
        path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: '', loadChildren: () => import('./components/pages/pages.module').then(m => m.PagesModule)
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
