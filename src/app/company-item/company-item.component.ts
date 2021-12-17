import { Component, OnInit, Input } from '@angular/core';
import { ICompany } from '../model/company';
@Component({
  selector: 'app-company-item',
  templateUrl: './company-item.component.html',
  styleUrls: ['./company-item.component.scss']
})
export class CompanyItemComponent {
  @Input() company!:ICompany
}
