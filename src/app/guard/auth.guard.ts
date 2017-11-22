import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable() 
export class AuthGuard implements CanActivate {

	constructor(private authService: AuthService, private router: Router) {

	}

	canActivate(
		route: ActivatedRouteSnapshot,
    	state: RouterStateSnapshot) {

		if(this.authService.isLoggedIn()) { return true; }

		this.router.navigate(['hero-login'], { queryParams: { returnUrl: state.url }});
		return false;

	}
}