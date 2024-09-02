import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlogFormPage } from './blog-form.page';

const routes: Routes = [
  {
    path: '',
    component: BlogFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogFormPageRoutingModule {}
