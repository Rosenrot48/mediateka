import {Component, Input, OnInit} from '@angular/core';
import {MediatekaRestService} from "../../services/mediateka-rest/mediateka-rest.service";

@Component({
  selector: 'app-txt-viewer',
  templateUrl: './txt-viewer.component.html',
  styleUrls: ['./txt-viewer.component.css']
})
export class TxtViewerComponent implements OnInit {

  @Input() _fileName: string;
  @Input() _fileLink: string;

  constructor(
    private mrs: MediatekaRestService
  ) { }

  ngOnInit() {
    this.mrs.getDocument(this._fileLink)
      .subscribe({
        next: value => {
          console.log(value);
        }
      })
  }

}
