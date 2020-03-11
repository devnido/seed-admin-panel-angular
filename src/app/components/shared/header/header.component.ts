import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthApiService } from 'src/app/services/api/auth-api.service';

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
        this.router.navigate(['/auth']);
    }

}
