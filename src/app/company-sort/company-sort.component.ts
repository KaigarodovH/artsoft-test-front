import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ICompany } from '../model/company';
import { CompanyService } from '../service/company.service';

@Component({
  selector: 'app-company-sort',
  templateUrl: './company-sort.component.html',
  styleUrls: ['./company-sort.component.scss']
})
export class CompanySortComponent implements OnInit {

  public sortForm!:FormGroup;

  public sortOptions: Array<{key:keyof ICompany, text: string}> = [
    {key:"business_name", text:"Name"},
    {key:"industry", text:"Industry"},
    {key:"bs_company_statement", text:"Strategize"},
  ]

  constructor(
    private fb:FormBuilder,
    private companyService: CompanyService) { }

  ngOnInit(): void {
    this.sortForm = this.fb.group(
      {
        sortField:[null]
      }
    )
    this.sortForm.get("sortField")?.valueChanges.subscribe(
      selectValue =>  this.companyService.sortBy(selectValue)
    )
  }
}
