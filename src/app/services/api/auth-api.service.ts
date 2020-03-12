import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
    providedIn: 'root'
})
export class AuthApiService {
    baseUrlAuth = environment.baseUrlAuthApi;

    jwt: string = '';
    refresh: string = '';
    loggedUser: User = new User();

    constructor(public http: HttpClient, public router: Router) {
        this.loadJwtFromStorage();
        this.loadRefreshFromStorage();
        this.loadUserFromStorage();
    }

    register(user: User, captcha: string) {

        const url = this.baseUrlAuth + '/register';

        const headers = this.generateIsAuthHeader();

        return this.http.post(url, { ...user, captcha }, { headers })
            .pipe(
                map((resp: any) => {
                    if (resp.ok) {
                        return true;
                    } else {
                        return false;
                    }
                })
            );
    }


    login(user: User, captcha: string) {

        const url = this.baseUrlAuth + '/login';

        const headers = this.generateIsAuthHeader();

        return this.http.post(url, { ...user, captcha }, { headers })
            .pipe(
                map((resp: any) => {

                    if (resp.ok) {

                        this.saveJwtInStorage(resp.content.jwt);
                        this.saveRefreshInStorage(resp.content.refresh);
                        this.saveUserInStorage(resp.content.user);

                        return true;
                    } else {
                        return false;
                    }
                })
            );
    }


    forgot(email: string, captcha: string) {

        const url = this.baseUrlAuth + '/forgot';

        const headers = this.generateIsAuthHeader();

        return this.http.post(url, { email, captcha }, { headers })
            .pipe(
                map((resp: any) => {

                    if (resp.ok) {

                        return true;
                    } else {
                        return false;
                    }
                })
            );
    }

    recovery(password: string, confirmPassword: string, changeToken: string, captcha: string) {

        const url = this.baseUrlAuth + '/recovery/' + changeToken;

        const headers = this.generateIsAuthHeader();

        return this.http.post(url, { password, confirmPassword, captcha }, { headers })
            .pipe(
                map((resp: any) => {

                    if (resp.ok) {

                        return true;
                    } else {
                        return false;
                    }
                })
            );
    }

    getNewJwt() {
        const url = this.baseUrlAuth + '/refresh/' + this.loggedUser._id;


        const headers = this.generateIsAuthHeader()
            .append('authorization', this.jwt);


        return this.http.post(url, { refresh: this.refresh }, { headers })
            .pipe(
                map((resp: any) => {

                    if (resp.ok) {

                        const newJwt = resp.content.jwt;
                        this.saveJwtInStorage(newJwt);
                    }

                    return resp;

                }),
                catchError(err => {
                    return throwError(err);
                })
            );
    }

    updateLoggedUser(user: User) {

        this.loggedUser.name = user.name;
        this.saveUserInStorage(this.loggedUser);
    }

    logout() {
        this.loggedUser = new User();
        this.refresh = '';
        this.jwt = '';

        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
        localStorage.removeItem('refresh');
    }

    isLoggedIn() {
        return this.jwt !== '';
    }


    private saveJwtInStorage(jwt: string) {
        localStorage.setItem('jwt', jwt);
        this.jwt = jwt;
    }

    private saveRefreshInStorage(refresh: string) {
        localStorage.setItem('refresh', refresh);
        this.refresh = refresh;
    }

    private saveUserInStorage(user: User) {
        localStorage.setItem('user', JSON.stringify(user));
        this.loggedUser = user;
    }

    private loadJwtFromStorage() {

        if (localStorage.getItem('jwt')) {
            this.jwt = localStorage.getItem('jwt');
        } else {
            this.jwt = '';
        }
    }

    private loadRefreshFromStorage() {

        if (localStorage.getItem('refresh')) {
            this.refresh = localStorage.getItem('refresh');
        } else {
            this.refresh = '';
        }
    }

    private loadUserFromStorage() {

        if (localStorage.getItem('user')) {
            this.loggedUser = JSON.parse(localStorage.getItem('user'));

        } else {
            this.loggedUser = new User();
        }

    }

    private generateIsAuthHeader() {
        return new HttpHeaders().append('is-auth', 'true');
    }

}

