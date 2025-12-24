import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageshareService {
  private messageSource = new BehaviorSubject<message>({showLabel:false,text:''});
  currentMessage = this.messageSource.asObservable();
  
  constructor() { }

  changeMessage(msg: message){
    this.messageSource.next(msg);
  }
}
