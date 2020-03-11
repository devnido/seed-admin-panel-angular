import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { PagesComponent } from './pages.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { TodoComponent } from './todos/todo.component';
import { TodosComponent } from './todos/todos.component';
import { SettingsComponent } from './settings/settings.component';
import { DateToLocalPipe } from 'src/app/pipes/date-to-local.pipe';



@NgModule({
    declarations: [
        WelcomeComponent,
        PagesComponent,
        ProfileComponent,
        TodoComponent,
        TodosComponent,
        SettingsComponent,
        DateToLocalPipe
    ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        PagesRoutingModule
    ],
    exports: [

    ]
})
export class PagesModule { }
