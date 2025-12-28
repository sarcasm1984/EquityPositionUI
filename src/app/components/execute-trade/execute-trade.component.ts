import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment-local';
import { TransactionService } from '../../services/transaction.service';
import { MessageshareService } from '../../services/messageshare.service';

@Component({
  selector: 'app-execute-trade',
  imports: [CommonModule, FormsModule],
  templateUrl: './execute-trade.component.html',
  styleUrl: './execute-trade.component.css'
})
export class ExecuteTradeComponent {

  constructor(private transactionService: TransactionService,
      private msgShare: MessageshareService
  ){}

  lotSize: number=0;

  allCodes = environment.SecurityCodeList;
  selectedCode: any;
  
  buysell = [
    {id:1,name:'BUY'}, 
    {id:2,name:'SELL'}
  ];
  selectedBuySell: any;

  action = [
    {id:1,name:'INSERT'}, 
    {id:2,name:'UPDATE'},
    {id:3,name:'CANCEL'}
  ];
  selectedAction: any;

  executeTrade = async() =>
  {
    try{
      if(this.selectedCode!=undefined && this.selectedCode!=null &&
        this.selectedBuySell!=undefined && this.selectedBuySell!=null &&
        this.selectedAction!=undefined && this.selectedAction!=null &&
        this.lotSize>0){

          let postBody = {
          "securityCode": this.selectedCode,
          "action": this.selectedAction,
          "qty": this.lotSize,
          "buy_Sell": this.selectedBuySell
          };
          (await this.transactionService.executeTrade(postBody)).subscribe(() => {
            this.msgShare.changeMessage({showLabel:true,text:'Trade Executed'});
          });
        }
        else {
          this.msgShare.changeMessage({showLabel:true,text:'All fields not selected to execute trade.'});
        }
    } catch(error){
      this.msgShare.changeMessage({showLabel:true,text:'Error while executing trade'});
    }
  }
}
