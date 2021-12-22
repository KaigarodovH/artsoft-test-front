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
    console.log("CL")
  }

  ngOnInit(): void {
    this.getCompanies()
    console.log("CL1")
  }

  ngOnDestroy(){
      if (this.subscriber) {
          this.subscriber.unsubscribe()
        }
      console.log("del cl1")
  }

  getCompanies(){
    this.subscriber = this.companyService.getCompanies().subscribe(
      {
        next: (companies)=>{
          console.log(companies);
          this.companies = companies
        }
      }
    );
  }
}
