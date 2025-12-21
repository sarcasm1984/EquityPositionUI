import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../environments/environment-local';
import { PositionService } from './services/position.service';
import { position } from './models/position';
import { transaction } from './models/transaction';
import { TransactionService } from './services/transaction.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private positionService: PositionService,
    private transactionService: TransactionService 
  ){}
  
  title = 'EquityPositionUI';

  positionObj: position = {};
  posData: position[] = [];
  rowData: transaction[] = [];

  TextMessage: string | undefined='';
  lotSize: number=0;

  showPosition: boolean = true;
  showPositionArr: boolean = true;
  showTransactions: boolean = true;
  showLabel: boolean = true;

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

  allCodesForPosition = environment.SecurityCodeList;
  selectedCodeForPosition: any;

  allCodesForTransaction = environment.SecurityCodeList;
  selectedCodeForTransaction: any;

  executeTrade = async() =>
  {
    try{
      let postBody = {
          "securityCode": this.selectedCode,
          "action": this.selectedAction,
          "qty": this.lotSize,
          "buy_Sell": this.selectedBuySell
      };

      (await this.transactionService.executeTrade(postBody)).subscribe(() => {
        this.TextMessage = 'Trade Executed';
      });
    } catch(error){
      this.TextMessage = 'Error while executing trade';
    }
  }

  viewPositions = async () =>
  {
    try{
      this.TextMessage="";
      this.showPosition = true;
      this.showPositionArr = true;
      this.showLabel = true;
      if(this.selectedCodeForPosition == 'ALL'){
        (await this.positionService.getAllPositions()).subscribe((positions) => {
          this.posData=positions;
          this.showLabel=!this.showLabel;
          this.showPositionArr=!this.showPositionArr;
          this.TextMessage = this.selectedCodeForPosition+" Position Retrieved";
        }); 
      } else {
        (await this.positionService.getPosition(this.selectedCodeForPosition)).subscribe((position) => {
          this.positionObj=position;
          this.showLabel=!this.showLabel;
          this.showPosition=!this.showPosition;
          this.TextMessage = this.selectedCodeForPosition+" Position Retrieved";
        });  
      }
    } catch(error){
      this.TextMessage = 'Error while viewing positions';
    }
  }

  viewTransactions = async () =>{
    try{
      this.showTransactions=true;
      this.showLabel = true;
      (await this.transactionService.getTransaction(this.selectedCodeForTransaction)).subscribe((tArr) => {
        this.rowData=tArr;
        if(this.rowData.length>0){
          this.TextMessage = this.selectedCodeForTransaction+" Transaction Retrieved";
          this.showLabel=!this.showLabel;
          this.showTransactions = !this.showTransactions;
        }
        else{
          this.TextMessage = "";
        }
      });      
    } catch(error){
      this.TextMessage = 'Error while viewing transactions';
    }
  }
}
