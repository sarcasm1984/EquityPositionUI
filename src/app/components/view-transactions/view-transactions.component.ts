import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { transaction } from '../../models/transaction';
import { environment } from '../../../environments/environment-local';
import { TransactionService } from '../../services/transaction.service';
import { MessageshareService } from '../../services/messageshare.service';

@Component({
  selector: 'app-view-transactions',
  imports: [CommonModule, FormsModule],
  templateUrl: './view-transactions.component.html',
  styleUrl: './view-transactions.component.css'
})
export class ViewTransactionsComponent {
  constructor(private transactionService: TransactionService,
      private msgShare: MessageshareService
    ){}

    rowData: transaction[] = [];
    
    TextMessage: string | undefined='';
  
    showTransactions: boolean = false;
  
    allCodesForTransaction = environment.SecurityCodeList;
    selectedCodeForTransaction: any;
  
    viewTransactions = async () =>{
      try{
        this.showTransactions=false;
        (await this.transactionService.getTransaction(this.selectedCodeForTransaction)).subscribe((tArr) => {
          this.rowData=tArr;
          if(this.rowData.length>0){
            this.TextMessage = this.selectedCodeForTransaction+" Transaction Retrieved";
            this.showTransactions = !this.showTransactions;
            this.msgShare.changeMessage({showLabel:true,text:this.TextMessage});
          }
          else{
            this.TextMessage = "";
            this.msgShare.changeMessage({showLabel:false,text:this.TextMessage});
          }
        });      
      } catch(error){
        this.TextMessage = 'Error while viewing transactions';
        this.msgShare.changeMessage({showLabel:true,text:this.TextMessage});
      }
    }
}
