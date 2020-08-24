import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FoldersComponent} from "./components/folders/folders.component";
import {LoginGuard} from "./services/LoginGuard";
import {LoginComponent} from "./components/login/login.component";
import {TodosComponent} from "./components/todos/todos.component";
import {CalendarComponent} from "./components/calendar/calendar.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'app', component: FoldersComponent, data: {title: 'Медиатека'}},
  {path: 'todos', component: TodosComponent, data: {title: 'Todos'}},
  {path: 'calendar', component: CalendarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
