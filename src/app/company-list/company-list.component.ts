import { Component, OnInit } from '@angular/core';
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
  constructor(companyService: CompanyService) { 
    this.companyService = companyService;
  }

  ngOnInit(): void {
    this.getCompanies()
  }

  getCompanies(){
    this.companies = this.companyService.getCompanies();
  }

}
