import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private sidenavStatus = new BehaviorSubject<boolean>(false);
  currentSidenavStatus = this.sidenavStatus.asObservable();

  constructor() { }

  toggleSidenav(opened: boolean) {
    this.sidenavStatus.next(opened);
  }
}
