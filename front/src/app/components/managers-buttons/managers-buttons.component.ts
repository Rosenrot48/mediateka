import {Component, Input, OnInit} from '@angular/core';
import {MatBottomSheet, MatBottomSheetConfig} from "@angular/material/bottom-sheet";
import {BottomsheetCreationComponent} from "../bottomsheet-creation/bottomsheet-creation.component";
import {eventDispatcher} from "../../store/app-state.service";
import {ActionsTypes} from "../../store/actions";
import {MediatekaRestService} from "../../services/mediateka-rest/mediateka-rest.service";

@Component({
  selector: 'app-managers-buttons',
  templateUrl: './managers-buttons.component.html',
  styleUrls: ['./managers-buttons.component.css']
})
export class ManagersButtonsComponent implements OnInit {

  @Input() path: []
  @Input() removes: [];


  constructor(
    private mrs: MediatekaRestService,
  private _bottomSheet: MatBottomSheet
  ) { }

  ngOnInit() {

  }
  openBottomSheet() {
    const config = new MatBottomSheetConfig();
    config.data = {
      path: this.path
    }
    this._bottomSheet.open(BottomsheetCreationComponent, config);
  }

  removeFolders() {
    this.removes.forEach(remove => { // TODO Переписать данный участок кода
      const path = (this.path && this.path.length) ?  this.path.join('/') + '/' + remove : remove;
      this.mrs.removeFolder(path)
        .subscribe(result => {
          if (result.response === 'succeed') {
            eventDispatcher.next({type: ActionsTypes.DELETE_REMOVE_FOLDER, payload: remove});
            this.mrs.getFolders(path)
              .subscribe(
                result => {
                  eventDispatcher.next({type: ActionsTypes.SHOW_FOLDERS, payload: result});
                }
              )
          }
        })
    })
  }

}
