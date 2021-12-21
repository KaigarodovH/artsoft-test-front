import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ICompany } from '../model/company';
import { JSONstr } from './data';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  public companies: ICompany[] = [];
  public sourceCompanies: ICompany[]=[];
  public subscriber: any;

  constructor(private api: ApiService) {
  }

  public fetchData(){ 
    let response = this.api.fetchData()
    response.subscribe(
      data => {
        console.log(data)
        this.sourceCompanies = data.slice();
        this.companies = data;
        //TODO: Ну и на сколько это адевкатно 
        this.subscriber.next(this.companies)
      }
    )
  }

  public getCompany(id: number): Observable<ICompany> {
    let company = this.companies.find(company => company.id === id)!;
    return of(company)
  }

  public getCompanies(immutable=false): Observable<ICompany[]> {
    if(this.companies.length == 0){
      this.fetchData();
    }
    //TODO: Нужна ли отписка ?
    const observable = new Observable<ICompany[]>((subscriber) => {
      this.subscriber = subscriber;
      this.subscriber.next( immutable ? this.sourceCompanies : this.companies)
    })
    return observable;
  }

  public sortBy<T extends keyof ICompany>(key: T) {
    let tmp: ICompany[] = this.companies.slice()
    this.subscriber.next(
      tmp.sort((firstComp, secondComp) => {
        if (firstComp[key] > secondComp[key]) {
          return 1;
        } else if (firstComp[key] < secondComp[key]) {
          return -1
        } else {
          return 0
        }
      })
    )
  }

  public filterBy(key: keyof ICompany, text:string){
    this.companies =  this.sourceCompanies.filter(company => {
      console.log(key)
      if((company[key] as string).toLowerCase().includes(text.toLowerCase())){
        return true;
      } else {
        return false;
      }
    })

    this.subscriber.next( this.companies);
  }

}
