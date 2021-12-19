import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScraperPageRoutingModule } from './scraper-routing.module';

import { ScraperPage } from './scraper.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScraperPageRoutingModule
  ],
  declarations: [ScraperPage]
})
export class ScraperPageModule {}
