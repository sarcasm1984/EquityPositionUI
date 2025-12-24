import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageshareService } from '../../services/messageshare.service';
import { message } from '../../models/message';

@Component({
  selector: 'app-message',
  imports: [CommonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent implements OnInit {
  msg: message = {showLabel:false, text: ''};

  constructor(private msgShare: MessageshareService){}

  ngOnInit(): void {
    this.msgShare.currentMessage.subscribe(msg => this.msg=msg);
  }
}
