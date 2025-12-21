import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment-local';
import { HttpClient } from '@angular/common/http';
import { transaction } from '../models/transaction';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private url = environment.apiUrl;
  constructor(private http:HttpClient) { }
  executeTrade= async(body: any)=>{
    return await this.http.post(this.url, body);
  }
  getTransaction = async(secCode: string): Promise<Observable<transaction[]>>=>{
    let tempUrl = '';
    if(secCode=='ALL')
      tempUrl = this.url+"/getallTransactions/";
    else
      tempUrl = this.url+"/getTransactions/"+secCode;
    return await this.http.get<transaction[]>(tempUrl);
  }
}
