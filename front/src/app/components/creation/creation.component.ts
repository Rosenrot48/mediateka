import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl} from "@angular/forms";
import {MediatekaRestService} from "../../services/mediateka-rest/mediateka-rest.service";
import {store, eventDispatcher} from "../../store/app-state.service";
import {ActionsTypes} from "../../store/actions";


@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.css']
})
export class CreationComponent {

  name: FormControl = new FormControl(null);
  constructor(
    public dialogRef: MatDialogRef<CreationComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private mrs: MediatekaRestService
  ) {  }

  closeDialog() {
    this.dialogRef.close();
  }
  createFolder(){
    const path = (this.data.path && this.data.path.length) ?  this.data.path.join('/') + '/' + this.name.value : this.name.value;
    this.mrs.createFolder(path)
      .subscribe({ // TODO Переписать данный участок кода
        next: value => {
          if (value.result === 'Папка успешно создана') {
            this.mrs.getFolders(this.data.path.join('/'))
              .subscribe({
                next: value1 => {
                  eventDispatcher.next({type: ActionsTypes.SHOW_FOLDERS, payload: value1})
                  this.dialogRef.close();
                }
              })
          }
        }
      })
      // .subscribe(result => {
      //   console.log(result);
      //   if ()
      // })
  }
}
