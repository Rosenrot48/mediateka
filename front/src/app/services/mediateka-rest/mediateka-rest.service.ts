import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MediatekaRestService {

  backEndpoint = `${environment.endpoint}/fs`;

  constructor(
    private http: HttpClient,
  ) { }

  getFolders(path?: string): Observable<any> {
    const endpoint = path? `${this.backEndpoint}/media?f=${path}` : `${this.backEndpoint}/media`;
    return this.http.get(endpoint);
  }

  getDocument(path: string): Observable<any> {
    return this.http.get(path);
  }
  createFolder(pathWithNewFolderName: string): Observable<any> {
    const endpoint = `${this.backEndpoint}/create`;
    return this.http.post(endpoint, {path: pathWithNewFolderName});
  }
  removeFolder(pathWithRemoveFolderName: string): Observable<any> {
    const endpoint = `${this.backEndpoint}/remove-folder`;
    return this.http.post(endpoint, {fp: pathWithRemoveFolderName});
  }
  upload(formData: FormData, path: string): Observable<any> {
    const endpoint = path?  `${this.backEndpoint}/upload-files?dp=${path}`: `${this.backEndpoint}/upload-files?`;
    return this.http.post(endpoint, formData)
  }
}
