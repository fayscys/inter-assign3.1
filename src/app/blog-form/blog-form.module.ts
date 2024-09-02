import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BlogFormPageRoutingModule } from './blog-form-routing.module';

import { BlogFormPage } from './blog-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BlogFormPageRoutingModule
  ],
  declarations: [BlogFormPage]
})
export class BlogFormPageModule {}
