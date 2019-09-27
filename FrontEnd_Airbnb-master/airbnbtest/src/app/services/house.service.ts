import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { House } from '../models/house.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class HouseService {
  constructor(private http: HttpClient) {}
  public urlHouse: string = "http://localhost:8080/house";

  public addHouse(house: House): Observable<House> {
    return this.http.post<House>(this.urlHouse, JSON.stringify(house) ,httpOptions);
  }

  public getOneHouse(id: number){
    return this.http.get<House>(`${this.urlHouse}/${id}`, httpOptions);
  }

  public editHouse(house: House){
    return this.http.put(`${this.urlHouse}/${house.id}/edit`, httpOptions);
  }

  public getAllHouses(){
    return this.http.get<House[]>(this.urlHouse, httpOptions);
  }

  public getAllHousesByUserId(id: number){
    return this.http.get<House[]>(`${this.urlHouse}/user/${id}`, httpOptions);
  }

}
