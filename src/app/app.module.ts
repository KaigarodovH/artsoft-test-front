import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { CompanyYandexMapComponent } from './company-yandex-map/company-yandex-map.component';
import { CompanyItemComponent } from './company-item/company-item.component';
import { CompanySortComponent } from './company-sort/company-sort.component';
import { CompanyFilterComponent } from './company-filter/company-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    CompanyListComponent,
    CompanyDetailComponent,
    CompanyYandexMapComponent,
    CompanyItemComponent,
    CompanySortComponent,
    CompanyFilterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
