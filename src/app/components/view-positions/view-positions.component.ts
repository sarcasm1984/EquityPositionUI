import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment-local';
import { position } from '../../models/position';
import { PositionService } from '../../services/position.service';
import { MessageshareService } from '../../services/messageshare.service';

@Component({
  selector: 'app-view-positions',
  imports: [CommonModule, FormsModule],
  templateUrl: './view-positions.component.html',
  styleUrl: './view-positions.component.css'
})
export class ViewPositionsComponent {
  constructor(private positionService: PositionService,
    private msgShare: MessageshareService
  ){}

  TextMessage: string | undefined='';
  positionObj: position = {};
  posData: position[] = [];
  showPosition: boolean = false;
  showPositionArr: boolean = false;

  allCodesForPosition = environment.SecurityCodeList;
  selectedCodeForPosition: any;

  viewPositions = async () =>
  {
    try{
      this.TextMessage="";
      this.showPosition = false;
      this.showPositionArr = false;
      if(this.selectedCodeForPosition == 'ALL'){
        (await this.positionService.getAllPositions()).subscribe((positions) => {
          this.posData=positions;
          this.showPositionArr=!this.showPositionArr;
          this.TextMessage = this.selectedCodeForPosition+" Position Retrieved";
          this.msgShare.changeMessage({showLabel:true,text:this.TextMessage});
        }); 
      } else {
        (await this.positionService.getPosition(this.selectedCodeForPosition)).subscribe((position) => {
          this.positionObj=position;
          this.showPosition=!this.showPosition;
          this.TextMessage = this.selectedCodeForPosition+" Position Retrieved";
          this.msgShare.changeMessage({showLabel:true,text:this.TextMessage});
        });  
      }
    } catch(error){
      this.TextMessage = 'Error while viewing positions';
      this.msgShare.changeMessage({showLabel:true,text:this.TextMessage});
    }
  }
}
