import { Component, OnInit } from '@angular/core';
import { SettingsUiService } from 'src/app/services/ui/settings-ui.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styles: []
})
export class SettingsComponent implements OnInit {

    constructor(public settingsService: SettingsUiService) { }

    ngOnInit(): void {
        this.putCheckIcon();
    }

    changeColor(theme: string, link: any) {


        this.applyCheckIcon(link);

        this.settingsService.applyTheme(theme);
    }

    applyCheckIcon(link: any) {

        const selectors: any = document.getElementsByClassName('selector');


        for (const ref of selectors) {
            ref.classList.remove('working');
        }

        link.classList.add('working');

    }

    putCheckIcon() {
        const selectors: any = document.getElementsByClassName('selector');

        const theme = this.settingsService.settings.theme;

        for (const ref of selectors) {
            if (ref.getAttribute('data-theme') === theme) {
                ref.classList.add('working');
                break;
            }
        }

    }

}
