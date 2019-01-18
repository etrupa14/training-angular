import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EventsService {

  private _emitters: { [channel: string]: EventEmitter<any>} = {};

  constructor() {
  }

  get(channel: string): EventEmitter<any> {
    if (!this._emitters[channel]) {
      this._emitters[channel] = new EventEmitter();
    }
    return this._emitters[channel];
  }

  // get(channel: string): EventEmitter<any> {
  //   if (!this._emitters[channel]) 
  //     this._emitters[channel] = new EventEmitter();
  //   return this._emitters[channel];
  // }

  // on<T>(key: any): Observable<T> {
  //   return this._onMyEvent
  //     .asObservable()
  //     .filter(event => event.key === key)
  //     .map(event => <T>event.data);
  // }

  // publish(key: any, value: any) {
  //   this._onMyEvent.next({key, value});
  // }

}
