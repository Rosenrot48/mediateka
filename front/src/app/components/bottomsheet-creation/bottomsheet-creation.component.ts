import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CreationComponent} from "../creation/creation.component";
import {CustomFileUploaderService} from "../../services/CustomUploadService";
import {environment} from "../../../environments/environment";
import {HttpXsrfTokenExtractor} from "@angular/common/http";
import {MediatekaRestService} from "../../services/mediateka-rest/mediateka-rest.service";

@Component({
  selector: 'app-bottomsheet-creation',
  templateUrl: './bottomsheet-creation.component.html',
  styleUrls: ['./bottomsheet-creation.component.css']
})
export class BottomsheetCreationComponent implements OnInit {

  private csrfToken: string;

  // public  uploader: CustomFileUploaderService = new CustomFileUploaderService(
  //   {
  //     url: this.data.path.length ?  `${environment.endpoint}/fs/upload-files?path=${this.data.path.toString()}` : `${environment.endpoint}/fs/upload-files`,
  //     itemAlias: 'files'
  //   }
  // );

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<BottomsheetCreationComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) private data: any,
    public dialog: MatDialog,
    private mediatekaRestService: MediatekaRestService
) {
  }



  ngOnInit() {
  }

  createFolder() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      path:  this.data.path
    }
    this.dialog.open(CreationComponent, dialogConfig);
    this._bottomSheetRef.dismiss();
  }
  // private setURL() {
  //   this.uploader.setOptions({
  //     url: this.data.path.length ?  `${environment.endpoint}/fs/upload-files?path=${this.data.path.join()}` : `${environment.endpoint}/fs/upload-files`,
  //     headers: [{
  //       name: 'X-XSRF-TOKEN', value: this.csrfToken
  //     }]
  //   });
  // }

  async uploadFiles(event) {
    let formData = new FormData();
    for (let i = 0; i < event.target.files.length; i++) {
      formData.append('uploadingFiles[]', event.target.files[i], event.target.files[i].name);
      // console.log(event.target.files[i])
      // formData.append("files", event.target.files[i], event.target.files[i].name);
      // console.log(formData)
    }
    console.log(formData);
    this.mediatekaRestService.upload(formData, this.data.path.length? this.data.path.join(): null)
      .subscribe({
        next: value => console.log(value)
      })
    }

}
