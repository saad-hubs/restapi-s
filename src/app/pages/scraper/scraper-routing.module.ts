import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScraperPage } from './scraper.page';

const routes: Routes = [
  {
    path: '',
    component: ScraperPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScraperPageRoutingModule {}
