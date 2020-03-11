import { Component, OnInit } from '@angular/core';

declare function init_plugins();


@Component({
    selector: 'app-page-not-found',
    templateUrl: './page-not-found.component.html',
    styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

    anio: number = new Date().getFullYear();

    constructor() { }

    ngOnInit(): void {
        init_plugins();
    }

}
