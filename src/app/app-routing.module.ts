import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompanyYandexMapComponent } from './company-yandex-map/company-yandex-map.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {path:"list", component: CompanyListComponent},
  {path:"detail/:id", component: CompanyDetailComponent},
  {path:"map", component: CompanyYandexMapComponent},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
