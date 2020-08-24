import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth/auth.service";
import {CookieService} from "angular2-cookie/core";

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.authService.changeRedirectUrl(state.url);
    return true;
    // // this.mrs.redirectUrl = state.url;
    // return this.mrs.isSession().pipe(
    //   map(rv => {
    //     if (!rv) {
    //       this.router.navigate(['/login']);
    //       return false;
    //     }
    //     return true;
    //   })
    // );
  }
}
