import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DataService} from "../../services/data/data.service";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {

  opened: boolean;

  constructor(
    private dataService: DataService,
    private router: Router
  ) {
    this.opened = false;
    this.dataService.currentSidenavStatus.subscribe( opened => {
      this.opened = opened;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.dataService.toggleSidenav(false);
  }
  toggleSidenav() {
    this.dataService.toggleSidenav(false);
  }

}
