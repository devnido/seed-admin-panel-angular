import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthApiService } from '../../services/api/auth-api.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styles: []
})
export class HeaderComponent implements OnInit {

    user: User = new User();

    constructor(private authApiService: AuthApiService, private router: Router) { }

    ngOnInit(): void {

        this.user = this.authApiService.loggedUser;
    }

    logout() {

        this.authApiService.logout();
    }

}
