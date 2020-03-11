import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthApiService } from '../services/api/auth-api.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authApiService: AuthApiService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const isAuth = req.headers.has('is-auth');

        if (!isAuth) {

            const jwt = this.authApiService.jwt;

            let newReq;

            if (jwt) {
                newReq = req.clone({
                    setHeaders: {
                        authorization: jwt
                    }
                });

                return next.handle(newReq);
            }

        }

        return next.handle(req);
    }
}
