import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageComponent } from './components/message/message.component';
import { ExecuteTradeComponent } from './components/execute-trade/execute-trade.component';
import { ViewPositionsComponent } from './components/view-positions/view-positions.component';
import { ViewTransactionsComponent } from './components/view-transactions/view-transactions.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MessageComponent, ExecuteTradeComponent, ViewPositionsComponent, ViewTransactionsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(){}
  
  title = 'EquityPositionUI';

}
