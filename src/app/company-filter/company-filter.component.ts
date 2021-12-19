import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup} from '@angular/forms';
import { CompanyService } from '../service/company.service';
import { ICompany } from '../model/company';

@Component({
  selector: 'app-company-filter',
  templateUrl: './company-filter.component.html',
  styleUrls: ['./company-filter.component.scss']
})

export class CompanyFilterComponent implements OnInit {

  public filterForm!: FormGroup;
  public filterOptions: Array<{key:keyof ICompany, text: string}> = [
    {key:"business_name", text:"Name"},
    {key:"industry", text:"Industry"},
    {key:"bs_company_statement", text:"Strategize"},
  ]


  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      filter: "",
      selectKey: [null],
    })
    this.filterForm.valueChanges.subscribe(
      filterProperty => {
        console.log(filterProperty)
        if(!filterProperty.selectKey) {
          filterProperty.selectKey = "business_name"
        }
        this.companyService.filterBy(filterProperty.selectKey, filterProperty.filter);
      }
    )
  }
}
