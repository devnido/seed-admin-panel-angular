import { Component, OnInit } from '@angular/core';
import { SidebarUiService } from '../../services/ui/sidebar-ui.service';
import { AuthApiService } from '../../services/api/auth-api.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

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
        this.router.navigate(['/login']);
    }

}
