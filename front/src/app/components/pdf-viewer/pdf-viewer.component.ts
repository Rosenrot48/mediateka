import {Component, Input, OnInit} from '@angular/core';
import {HttpHeaders} from "@angular/common/http";
import {CookieService} from "angular2-cookie/core";

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent implements OnInit {


  httpHeaders;
  @Input() _fileName: string;
  @Input() _fileLink: string;
  constructor(
    private cookieService: CookieService
  ) {
    this.httpHeaders = new HttpHeaders({
      'authorization': `Bearer ${this.cookieService.get('jwt_token')}`
    })
  }

  ngOnInit() {
  }

}
