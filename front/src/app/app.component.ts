import {AfterViewChecked, Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataService} from "./services/data/data.service";
import {MatSidenavContent} from "@angular/material/sidenav";
import {timer} from "rxjs";
import {HttpInterceptorIndicatorService} from "./services/http/http-interceptor-indicator.service";
import {delay, startWith} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewChecked{
  title = 'front';

  @ViewChild('content') matSidenavContent: MatSidenavContent;
  topPositionToStartShowing = 50;
  sidenavMode = 'over';
  isShow: boolean;
  isOpened: boolean;
  sidenavSubscriber: any;

  constructor(
    private dataService: DataService,
    @Inject('Window') window: Window  ) {

  }

  ngOnInit() {
    this.sidenavSubscriber = this.dataService.currentSidenavStatus
      .subscribe(status => {
        this.isOpened = status;
      });

  }
  ngAfterViewChecked() {
    timer(0)
      .subscribe({
        next: value => {
          window.innerWidth < 800 ? this.sidenavMode = 'over' : this.sidenavMode = 'push'
        }
      })
  }

  handleScroll(event) {
    (event.target.scrollTop >= this.topPositionToStartShowing) ? this.isShow = true : this.isShow = false;
  }

  gotoTop() {
    this.matSidenavContent.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  sidenavToggle() {
    this.dataService.toggleSidenav(false);
  }

  ngOnDestroy(): void {
    this.sidenavSubscriber.unsubscribe()
  }

}
