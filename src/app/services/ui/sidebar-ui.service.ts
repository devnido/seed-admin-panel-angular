import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SidebarUiService {

    menu: any = [
        {
            titulo: 'Principal',
            icono: 'mdi mdi-gauge',
            submenu: [
                { titulo: 'Inicio', url: '/bienvenido' }
            ]
        },
        {
            titulo: 'Administración',
            icono: 'mdi mdi-folder-lock-open',
            submenu: [
                { titulo: 'Tareas', url: '/tareas' }
            ]
        }
    ];

    constructor() { }
}
