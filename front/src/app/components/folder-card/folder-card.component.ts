import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { eventDispatcher} from '../../store/app-state.service';
import {ActionsTypes} from "../../store/actions";

@Component({
  selector: 'app-folder-card',
  templateUrl: './folder-card.component.html',
  styleUrls: ['./folder-card.component.css']
})
export class FolderCardComponent implements OnInit {

  @Input() folderName: string;
  @Input() path: [];
  @Output() checkBoxClick = new EventEmitter();
  @Output() folderClick = new EventEmitter();

  checkBox: boolean;

  constructor() { }
  ngOnInit() {
  }
  clickHandler() {
    // console.log(this.folderName);

    if (this.folderName.includes('.torrent') || this.folderName.includes('.sql')) {
      console.log('данный файл мы не показываем:(');
    } else {
      eventDispatcher.next({type: ActionsTypes.ADD_PATH, payload: this.folderName});
      if (this.folderName.includes('.pdf')) {
        eventDispatcher.next({type: ActionsTypes.SHOW_PDF});
        // this.folderClick.emit(ActionsTypes.SHOW_PDF);

      } else if (this.folderName.includes('.mp4')) {
        eventDispatcher.next({type: ActionsTypes.SHOW_VIDEO});
        // this.folderClick.emit(ActionsTypes.SHOW_VIDEO);
      } else if (this.folderName.includes('.png')) {
        // this.folderClick.emit(ActionsTypes.SHOW_PDF);
      } else if (this.folderName.includes('.txt')) {
        eventDispatcher.next({type: ActionsTypes.SHOW_TXT});
      } else {
        this.folderClick.emit(ActionsTypes.SHOW_FOLDERS);
      }
    }
  }

  checkboxClicker() {
    if (this.checkBox) {
      eventDispatcher.next({type: ActionsTypes.ADD_REMOVE_FOLDER, payload: this.folderName});
    } else {
      eventDispatcher.next({type: ActionsTypes.DELETE_REMOVE_FOLDER, payload: this.folderName});
    }
  }

}
