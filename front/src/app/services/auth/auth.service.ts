import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  backEndpoint = `${environment.endpoint}/auth`;
  redirectUrl = new BehaviorSubject(null);
  constructor(
    private http: HttpClient
  ) { }

  changeRedirectUrl(url: string): void {
    this.redirectUrl.next(url);
  }

  loginUser(credentials: any): Observable<any> {
    const endpoint = `${this.backEndpoint}/login`;
    return this.http.post(endpoint, credentials);
  }
}
