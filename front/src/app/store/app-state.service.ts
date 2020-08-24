import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {ActionsTypes} from "./actions";


interface InitialState {
  content: null,
  folders: [],
  isLoading: false,
  error: null,
  path: [],
  removes: []
}

let state: InitialState = {
  content: null,
  folders: [],
  isLoading: false,
  error: null,
  path: [],
  removes: []
}

interface Event {
  type: String;
  payload?: any;
}


export const store = new Subject<InitialState>();
export const eventDispatcher = new Subject<Event>();

eventDispatcher.subscribe((data: Event) => {
  switch (data.type) {
    case ActionsTypes.SHOW_FOLDERS:
      state = {
        ...state,
        folders: data.payload,
        // @ts-ignore
        content: 'folder',
      }
      store.next(state);
      break;
    case ActionsTypes.ADD_PATH:
      state = {
        ...state,
        // @ts-ignore
        path: [...state.path, data.payload]
      }
      store.next(state);
      break;
    case ActionsTypes.REMOVE_PATH:
      state = {
        ...state,
        // @ts-ignore
        path: data.payload
      }
      store.next(state);
      break;
    case ActionsTypes.ROOT_PATH:
      state = {
        ...state,
        path: [],
        // @ts-ignore
        content: 'folder'
      }
      store.next(state);
      break;
    case ActionsTypes.SHOW_VIDEO:
      state = {
        ...state,
        // @ts-ignore
        content: 'video'
      }
      store.next(state);
      break;
    case ActionsTypes.SHOW_PDF:
      state = {
        ...state,
        // @ts-ignore
        content: 'pdf'
      }
      store.next(state);
      break;
    case ActionsTypes.SHOW_TXT:
      state = {
        ...state,
        // @ts-ignore
        content: 'txt'
      }
      store.next(state);
      break;
    case ActionsTypes.ADD_REMOVE_FOLDER:
      state = {
        ...state,
        // @ts-ignore
        removes: [...state.removes, data.payload]
      }
      store.next(state);
      break;
    case ActionsTypes.DELETE_REMOVE_FOLDER:
      state = {
        ...state,
        // @ts-ignore
        removes: state.removes.filter(value => value !== data.payload)
      }
      store.next(state);
      break;
    default:
      break;
  }
});


// @Injectable({
//   providedIn: 'root'
// })
// export class AppStateService {


  // appState$ = new BehaviorSubject(this.initialState);
  // appStateListener = this.appState$.asObservable();
  // constructor() {
  // }
  //
  // addPath(path: string) {
  //
  // }




