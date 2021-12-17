import { Injectable } from '@angular/core';
import { ICompany } from '../model/company';
import { JSONstr } from './data';
@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  
  public companies:ICompany[]

  constructor() {
  
    let obj = JSON.parse(JSONstr)
    this.companies = obj
    console.log(obj)
  }

  public getCompany(id:number):ICompany | undefined{
    let company = this.companies.find(company => company.id === id)
    return company
  }

  public getCompanies():ICompany[]{
    return this.companies;
  }

}
