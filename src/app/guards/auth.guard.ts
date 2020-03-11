import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthApiService } from '../services/api/auth-api.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authApiService: AuthApiService, private router: Router) { }
    canActivate(): boolean {

        const isLoggedIn = this.authApiService.isLoggedIn();

        if (!isLoggedIn) {
            this.router.navigate(['/auth']);
        }

        return isLoggedIn;
    }

}
