import {BehaviorSubject} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UserStore {
  private  User = new BehaviorSubject(null);
  currentUser = this.User.subscribe();


  constructor() {
  }

  setUser(user: any) {
    this.User.next(user);
  }
}
