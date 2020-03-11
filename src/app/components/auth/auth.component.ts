import { Component, OnInit } from '@angular/core';


declare function init_plugins();

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styles: [`.login-register {
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-position: center center;
                    height: 100%;
                    width: 100%;
                    padding: 10% 0;
                    position: fixed;
                }
                .login-box {
                    width: 400px;
                    margin: 0 auto;
                }
                .login-box .footer {
                    width: 100%;
                    left: 0px;
                    right: 0px;
                }
                .login-box .social {
                    display: block;
                    margin-bottom: 30px;
                }
                #recoverform {
                    display: none;
                }
                .login-sidebar {
                    padding: 0px;
                    margin-top: 0px;
                }
                .login-sidebar .login-box {
                    right: 0px;
                    position: absolute;
                    height: 100%;
                }`]
})
export class AuthComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
        init_plugins();
    }

}
