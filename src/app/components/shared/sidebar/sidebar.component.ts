import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { SidebarUiService } from 'src/app/services/ui/sidebar-ui.service';
import { AuthApiService } from 'src/app/services/api/auth-api.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styles: []
})
export class SidebarComponent implements OnInit {

    sideBarMenu: [] = [];

    user: User = new User();

    constructor(private router: Router, private sideBarService: SidebarUiService, private authService: AuthApiService) { }

    ngOnInit(): void {

        this.user = this.authService.loggedUser;

        this.sideBarMenu = this.sideBarService.menu;
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/auth']);
    }

}
