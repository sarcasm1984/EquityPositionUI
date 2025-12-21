import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment-local';
import { HttpClient } from '@angular/common/http';
import { position } from '../models/position';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  private url = environment.apiUrl;
  constructor(private http:HttpClient) { }
  getPosition= async(secCode: string): Promise<Observable<position>>=>{
    let tempUrl = this.url+"/getPosition/"+secCode;
    return await this.http.get<position>(tempUrl);
  }
  getAllPositions= async(): Promise<Observable<position[]>>=>{
    let tempUrl =this.url+"/getallPositions/";
    return await this.http.get<position[]>(tempUrl);
  }
}
