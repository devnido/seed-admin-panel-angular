import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProfileApiService {

    baseUrlResources = environment.baseUrlResourcesApi;

    constructor(private http: HttpClient) { }

    changeUserInfo(idUser: string, name: string) {

        const url = this.baseUrlResources + '/users/' + idUser + '/info';

        return this.http.put(url, { name })
            .pipe(
                map((resp: any) => {

                    if (resp.ok) {

                        return resp.content.user;
                    } else {
                        return false;
                    }
                })
            );
    }

    changePassword(idUser: string, currentPassword: string, newPassword: string, confirmNewPassword: string) {

        const url = this.baseUrlResources + '/users/' + idUser + '/password';

        return this.http.put(url, { currentPassword, newPassword, confirmNewPassword })
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


}
