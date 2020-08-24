import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TodosService {


  backEndpoint = `${environment.endpoint}/todo`;

  constructor(
    private http: HttpClient
  ) { }

  getTodos(): Observable<any> {
    const endpoint = `${this.backEndpoint}/`;
    return this.http.get(endpoint);
  }
  createTodo(title: string): Observable<any> {
    const endpoint = `${this.backEndpoint}/create`;
    return this.http.post(endpoint, {title});
  }

  removeTodo(id: string): Observable<any> {
    const endpoint = `${this.backEndpoint}/${id}`;
    return this.http.delete(endpoint);
  }
  changeStatus(id: string, status: string): Observable<any> {
    const endpoint = `${this.backEndpoint}/change-status/${id}`;
    return this.http.put(endpoint, {status})
  }
}
