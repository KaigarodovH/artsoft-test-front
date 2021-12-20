import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs';
import { ICompany } from '../model/company';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public url = "https://random-data-api.com/api/company/random_company?size=100"
  constructor(private http:HttpClient) { }

  public fetchData(){
    return this.http.get<ICompany[]>(this.url).pipe(catchError(this.handleError))
  }
  
  public handleError(error: HttpErrorResponse){ 
    console.error(error.message);
    return []
  }

}
