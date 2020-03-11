import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthApiService } from '../services/api/auth-api.service';
import { switchMap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private authApiService: AuthApiService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const firstReq = req.clone();

        return next.handle(firstReq)
            .pipe(
                catchError(err => {

                    if (err.status === 401 && err.error && err.error.content && err.error.content.error.type === 'Session Expired') {

                        return this.authApiService.getNewJwt()
                            .pipe(
                                switchMap((resp: any) => {
                                    const reqAgain = req.clone({
                                        setHeaders: {
                                            authorization: resp.content.jwt
                                        }
                                    });
                                    return next.handle(reqAgain);
                                })
                            );
                    } else if (err.status === 401 && err.error && err.error.content && err.error.content.error.type === 'Unauthorized') {
                        this.authApiService.logout();
                    }

                    return throwError(err);
                })
            );

    }


}
