import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { transaction } from '../../models/transaction';
import { environment } from '../../../environments/environment-local';
import { TransactionService } from '../../services/transaction.service';
import { MessageshareService } from '../../services/messageshare.service';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import { AgGridAngular } from 'ag-grid-angular';
import type {ColDef } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-view-transactions',
  imports: [CommonModule, FormsModule, AgGridAngular],
  templateUrl: './view-transactions.component.html',
  styleUrl: './view-transactions.component.css'
})
export class ViewTransactionsComponent {
  constructor(private transactionService: TransactionService,
      private msgShare: MessageshareService
    ){}

    private rowData: transaction[] = [];

    private colDefs: ColDef<transaction>[] = [
      { field: "id", headerName:"Transaction ID" },
      { field: "tradeId", headerName:"Trade ID", filter:true },
      { field: "tradeVersion", headerName:"Trade Version", filter:true },
      { field: "securityCode", headerName:"Security Code", filter:true },
      { field: "action", headerName:"Action", filter:true },
      { field: "qty", headerName:"Quantity", filter:true },
      { field: "buy_Sell", headerName:"Buy/Sell", filter:true }
    ];

    private defaultColDef: ColDef = {
      flex: 1,
      minWidth: 100
    };
    
    TextMessage: string | undefined='';
  
    showTransactions: boolean = false;
  
    allCodesForTransaction = environment.SecurityCodeList;
    selectedCodeForTransaction: any;

    viewTransactions = async () =>{
      try{
        this.showTransactions=false;
        (await this.transactionService.getTransaction(this.selectedCodeForTransaction)).subscribe((tArr) => {
          this.rowData = tArr;
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
