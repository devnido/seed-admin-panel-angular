import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class SettingsUiService {


    settings: Settings = {
        themeUrl: 'assets/css/colors/default.css',
        theme: 'default'
    };

    constructor(@Inject(DOCUMENT) private document) { }

    saveSettings() {

        localStorage.setItem('settings', JSON.stringify(this.settings));
    }

    cargarAjustes() {

        if (localStorage.getItem('settings')) {
            this.settings = JSON.parse(localStorage.getItem('settings'));


            this.applyTheme(this.settings.theme);

        } else {

        }

    }

    applyTheme(theme: string) {
        const url = `assets/css/colors/${theme}.css`;

        this.document.getElementById('theme').setAttribute('href', url);

        this.settings.theme = theme;

        this.settings.themeUrl = url;

        this.saveSettings();

    }
}

interface Settings {
    themeUrl: string;
    theme: string;
}
