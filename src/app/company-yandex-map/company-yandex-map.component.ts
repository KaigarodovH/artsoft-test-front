import { Component, OnInit } from '@angular/core';
import { Map } from 'yandex-maps';
import { ICompany } from '../model/company';
import { CompanyService } from '../service/company.service';
declare var ymaps:any;

@Component({
  selector: 'app-company-yandex-map',
  templateUrl: './company-yandex-map.component.html',
  styleUrls: ['./company-yandex-map.component.scss']
})
export class CompanyYandexMapComponent implements OnInit {

  public map!:Map;
  public companies:ICompany[] = [];

  constructor(public companyService: CompanyService) {
  }

  ngOnInit(): void {
    ymaps.ready().then(() => {
      this.map = new ymaps.Map('map', {
        center: [56.836649, 60.623286],
        zoom: 12
      });
    });
    this.getCountries()
  }

  getCountries(){
    this.companyService.getCompanies().subscribe(
      { next: (companies)=>this.companies = companies}
    );
  }

  addMark(id:number){
    let tmpCompany = this.companies.find(company=>company.id === id)!;
    let coords = [tmpCompany.latitude, tmpCompany.longitude];
    let newPlacemark = new ymaps.Placemark(coords);
    this.map.geoObjects.add(newPlacemark);
    this.map.setCenter(coords)
  }
}
