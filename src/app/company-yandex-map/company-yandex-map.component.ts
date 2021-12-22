import { Subscriber, Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ICompany } from '../model/company';
import { CompanyService } from '../service/company.service';

declare var ymaps:any;
@Component({
  selector: 'app-company-yandex-map',
  templateUrl: './company-yandex-map.component.html',
  styleUrls: ['./company-yandex-map.component.scss'],
})
export class CompanyYandexMapComponent implements OnInit {
 
  public map!:ymaps.Map;
  public objectManager!:ymaps.ObjectManager;
  public companies:ICompany[] = [];
  private subscriber!:Subscription;

  constructor(public companyService: CompanyService) {
  }

  ngOnInit(): void {
    Promise.all([this.getCompanies(),this.createMap()]).then(()=>{
        this.addMarks();
    })
  }
  ngOnDestroy(): void {
    if (this.subscriber){
      this.subscriber.unsubscribe()
    }
  }
  getCompanies():Promise<any>{
    let promise = new Promise((res,rej)=>{
        this.subscriber = this.companyService.getCompanies(true)
        .subscribe(
            (companies)=>{this.companies = companies;
            if(this.companies.length !==0){
                res("data fetched")
            }
        })
    })
    return promise;
  }

  createMap():Promise<any>{
    return ymaps.ready().then(() => {
      this.map = new ymaps.Map('map', {
        center: [56.836649, 60.623286],
        zoom: 2
      });
      this.objectManager = new ymaps.ObjectManager({
        clusterize: true,
        gridSize: 32,
        clusterDisableClickZoom: true,
      });
      this.objectManager.objects.options.set('preset', 'islands#violetDotIcon');
      this.objectManager.clusters.options.set('preset', 'islands#violetClusterIcons');
      this.map.geoObjects.add(this.objectManager);
    });
  }

  addMarks():void{
    let data = {
      "type": "FeatureCollection",
      "features": this.companies.map((country)=>{
         return {
           "type": "Feature",
           "id": country.id,
           "geometry": {"type": "Point", "coordinates": [country.latitude, country.longitude]},
           "properties": {
              "balloonContentHeader": country.business_name,
              "balloonContentBody":country.phone_number,
              "balloonContentFooter":country.industry
           }
          }
      })
    }
    this.objectManager.add(data);
  }

  moveToCompany(company:ICompany):void{
    let coords = [company.latitude, company.longitude];
    this.map.setCenter(coords);
    this.map.setZoom(12);
    let targetCompany = this.objectManager.getObjectState(company.id.toString());
    (this.objectManager.objects as any).balloon.open(company.id);
  }
}
