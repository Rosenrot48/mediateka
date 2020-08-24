import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpInterceptorIndicatorService} from "./http-interceptor-indicator.service";
import {Router} from "@angular/router";
import {finalize, tap} from "rxjs/operators";
import {CookieService} from "angular2-cookie/core";


@Injectable({
    providedIn: 'root'
  })
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(
    private httpInterceptorIndicatorService: HttpInterceptorIndicatorService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
        // withCredentials: true,
        headers: this.cookieService.get('jwt_token') ?
          new HttpHeaders({'authorization': `Bearer ${this.cookieService.get('jwt_token')}`} ) : null
      });
    this.httpInterceptorIndicatorService.onStarted(req);
    return next.handle(req)
      .pipe(
        tap(() => {},
          (error: HttpErrorResponse) => {
          if (error.status === 401) {
            console.log('Ошибка авторизации');
            this.router.navigate(['/login']);
          }
          }),
        finalize(() => this.httpInterceptorIndicatorService.onFinished(req))
      );
  }

}
