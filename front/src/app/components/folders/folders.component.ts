import {Component, OnDestroy, OnInit} from '@angular/core';
import { eventDispatcher, store } from '../../store/app-state.service';
import {MediatekaRestService} from "../../services/mediateka-rest/mediateka-rest.service";
import {ActionsTypes} from "../../store/actions";
import {environment} from "../../../environments/environment";
import {MatBottomSheet, MatBottomSheetConfig} from "@angular/material/bottom-sheet";
import {BottomsheetCreationComponent} from "../bottomsheet-creation/bottomsheet-creation.component";

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.css']
})
export class FoldersComponent implements OnInit, OnDestroy {

  state = {
    path: [],
    content: null,
    folders: [],
    removes: []
  };

  chat: any[] = [
    {from: 'abobrov', text: 'Привет всем!'},
    {from: 'arubashenkov', text: 'Привет, Андрей!'},
    {from: 'abobrov', text: '@arubasenkov, как на работе дела?'}
  ]

  storeSubscriber$: any;
  videoUrl: string = null;
  documentUrl: string = null;

  constructor(
    private mrs: MediatekaRestService,
  ) {
  }

  ngOnInit() {
    this.getFolders();
    this.storeSubscriber();
  }

  ngOnDestroy() {
    this.storeSubscriber$.unsubscribe();
  }

  folderClickHandler(event: any) {
    // console.log(event);
    this.getFolders(this.state.path.join('/'))
  }

  clickRoot() {
    eventDispatcher.next({type: ActionsTypes.ROOT_PATH});
    this.mrs.getFolders()
      .subscribe(result => {
        eventDispatcher.next({type: ActionsTypes.SHOW_FOLDERS, payload: result})
      })
  }



  getDocument() {
    this.mrs.getDocument(this.documentUrl)
      .subscribe(result => {
        console.log(result);
      })
  }

  getFolders(path?: string) {
    this.mrs.getFolders(path)
      .subscribe(
        result => {
          eventDispatcher.next({type: ActionsTypes.SHOW_FOLDERS, payload: result});
        }
      )
  }


  storeSubscriber() {
    this.storeSubscriber$ = store.subscribe(state => {
      this.state = state;
      this.videoUrl = `${environment.endpoint}/fs/video?v=${this.state.path.join('/')}`
      this.documentUrl = `${environment.endpoint}/fs/document/?fp=${this.state.path.join('/')}`
    })
  }



}
