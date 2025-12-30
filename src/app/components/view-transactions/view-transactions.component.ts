import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { transaction } from '../../models/transaction';
import { environment } from '../../../environments/environment-local';
import { TransactionService } from '../../services/transaction.service';
import { MessageshareService } from '../../services/messageshare.service';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import { AgGridAngular } from 'ag-grid-angular';
import type {ColDef, GridOptions, PaginationChangedEvent, GridApi } from 'ag-grid-community';

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
    ){
      this.gridOptions.pagination = true;
      this.gridOptions.paginationPageSize = 5;
      this.gridOptions.paginationPageSizeSelector = [5, 10, 15];
      this.gridOptions.onPaginationChanged = this.onPaginationChanged;
    }

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

    private gridOptions: GridOptions = {};
    private gridApi!: GridApi;
    
    TextMessage: string | undefined='';
  
    showTransactions: boolean = false;
  
    allCodesForTransaction = environment.SecurityCodeList;
    selectedCodeForTransaction: any;

    onPaginationChanged = (evt: PaginationChangedEvent) => {
      this.gridApi = evt.api;
      this.gridOptions.paginationPageSize = this.gridApi.paginationGetPageSize();
    }

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
