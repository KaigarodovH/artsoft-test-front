import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICompany } from '../model/company';
import { CompanyService } from '../service/company.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
  
  private companyService: CompanyService;
  public companies: ICompany[] = [];
  private subscriber!:Subscription;

  constructor(companyService: CompanyService) { 
    this.companyService = companyService;
  }

  ngOnInit(): void {
    this.getCompanies()
  }

  ngOnDestroy(){
    if (this.subscriber) {
        this.subscriber.unsubscribe()
    }
  }

  getCompanies(){
    this.subscriber = this.companyService.getCompanies().subscribe(
      {
        next: (companies)=>{
          this.companies = companies
        }
      }
    );
  }
}
