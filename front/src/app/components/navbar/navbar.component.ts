import {Component, Input, OnInit} from '@angular/core';
import {eventDispatcher, store} from "../../store/app-state.service";
import {ActionsTypes} from "../../store/actions";
import {MediatekaRestService} from "../../services/mediateka-rest/mediateka-rest.service";
import {DataService} from "../../services/data/data.service";
import {ActivatedRoute, Route} from "@angular/router";
import {delay, startWith} from "rxjs/operators";
import {HttpInterceptorIndicatorService} from "../../services/http/http-interceptor-indicator.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() title: string
  isLoading: any = false;
  mediatekaView: boolean;
  pathArr: string [] = [];
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private mrs: MediatekaRestService,
    private httpInterceptorIndicatorService: HttpInterceptorIndicatorService,

  ) {
    this.mediatekaView = this.route.snapshot.routeConfig.path === 'app';
  }

  ngOnInit() {
    store.subscribe({
      next: value => {
        this.pathArr = value.path;
      }
    })
    this.httpInterceptorIndicatorService.onLoadingChanged.pipe(startWith(true), delay(0)).subscribe({
      next: (value: boolean) => {
        this.isLoading = value;
      },
    });
  }

  clickRoot() {
    eventDispatcher.next({type: ActionsTypes.ROOT_PATH});
    this.mrs.getFolders()
      .subscribe(result => {
        eventDispatcher.next({type: ActionsTypes.SHOW_FOLDERS, payload: result})
      })
  }
  sidenavToggle() {
    this.dataService.toggleSidenav(true);
  }
  clickRemove(path: string) {
    eventDispatcher.next({type: ActionsTypes.REMOVE_PATH, payload: this.pathArr.slice(0, this.pathArr.indexOf(path) + 1)})
    this.mrs.getFolders(this.pathArr.join('/'))
      .subscribe(result => {
        eventDispatcher.next({type: ActionsTypes.SHOW_FOLDERS, payload: result});
      })
  }

}
