import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProfileComponent } from './profile/profile.component';
import { TodosComponent } from './todos/todos.component';
import { TodoComponent } from './todos/todo.component';
import { SettingsComponent } from './settings/settings.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
    {
        path: '', component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'bienvenido', component: WelcomeComponent, data: { titulo: 'Bienvenido' }
            },
            {
                path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil' }
            },
            {
                path: 'configuracion', component: SettingsComponent, data: { titulo: 'Configuración' }
            },
            {
                path: 'tareas', component: TodosComponent, data: { titulo: 'Tareas' }
            },
            {
                path: 'tarea/:id', component: TodoComponent, data: { titulo: 'Tarea' }
            },
            {
                path: '', redirectTo: '/bienvenido', pathMatch: 'full'
            }
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
