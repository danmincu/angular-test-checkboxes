import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MycomponentComponent} from './mycomponent.component';
import { CheckboxFormComponent } from './checkbox-form/checkbox-form.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports:      [ BrowserModule, FormsModule ,
    HttpClientModule,
    ReactiveFormsModule // Add this line
  ],
  declarations: [ MycomponentComponent, CheckboxFormComponent ],
  bootstrap:    [MycomponentComponent  ],
  exports: [MycomponentComponent, CheckboxFormComponent]
})
export class MymoduleModule { }