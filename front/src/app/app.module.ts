import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FoldersComponent } from './components/folders/folders.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { FolderCardComponent } from './components/folder-card/folder-card.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatCardModule} from "@angular/material/card";
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PdfViewerComponent } from './components/pdf-viewer/pdf-viewer.component';
import { TxtViewerComponent } from './components/txt-viewer/txt-viewer.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import { BottomsheetCreationComponent } from './components/bottomsheet-creation/bottomsheet-creation.component';
import {MatListModule} from "@angular/material/list";
import {MatDialogModule} from "@angular/material/dialog";
import { CreationComponent } from './components/creation/creation.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { ManagersButtonsComponent } from './components/managers-buttons/managers-buttons.component';
import { LoginComponent } from './components/login/login.component';
import {LoginGuard} from "./services/LoginGuard";
import { TodosComponent } from './components/todos/todos.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { CalendarComponent } from './components/calendar/calendar.component';
import {MatTableModule} from "@angular/material/table";
import {FileUploadModule} from "ng2-file-upload";
import {MatMenuModule} from "@angular/material/menu";
import {SafeHtmlPipe} from "./pipes/safeHtml";
import {HttpInterceptorIndicatorService} from "./services/http/http-interceptor-indicator.service";
import {CustomHttpInterceptor} from "./services/http/http-interceptor";
import {Router} from "@angular/router";
import {CookieService} from "angular2-cookie/core";
import {ProgressBarComponent} from "./components/loading/loading.component";
import {MatProgressBarModule} from "@angular/material/progress-bar";

@NgModule({
  declarations: [
    AppComponent,
    FoldersComponent,
    FolderCardComponent,
    NavbarComponent,
    PdfViewerComponent,
    TxtViewerComponent,
    BottomsheetCreationComponent,
    CreationComponent,
    ManagersButtonsComponent,
    LoginComponent,
    TodosComponent,
    SidenavComponent,
    CalendarComponent,
    SafeHtmlPipe,
    ProgressBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    PdfViewerModule,
    FormsModule,
    MatTooltipModule,
    MatBottomSheetModule,
    MatListModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSidenavModule,
    DragDropModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    FileUploadModule,
    MatMenuModule,
    MatProgressBarModule,


  ],
  providers: [
    CookieService,
    LoginGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true,
    },
    { provide: 'Window',  useValue: window },
    MatDatepickerModule
  ],
  bootstrap: [AppComponent],
  entryComponents: [BottomsheetCreationComponent, CreationComponent]
})
export class AppModule { }
