import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICompany } from '../model/company';
import { CompanyService } from '../service/company.service';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss']
})
export class CompanyDetailComponent implements OnInit {
  private route: ActivatedRoute;
  private companyService: CompanyService;
  public company?: ICompany;
  constructor(route: ActivatedRoute,
    companyService: CompanyService) {
    this.route = route;
    this.companyService = companyService;
  }

  ngOnInit(): void {
    this.getCompany()
  }

  getCompany():void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.companyService.getCompany(id).subscribe(
      company => this.company = company
    );
  }
}
