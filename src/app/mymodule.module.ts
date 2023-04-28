import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MycomponentComponent } from './mycomponent.component';
import { CheckboxFormComponent } from './checkbox-form/checkbox-form.component';
import { HttpClientModule } from '@angular/common/http';
import { IndustryQueryComponent } from './industry-query/industry-query.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule, // Add this line
  ],
  declarations: [
    MycomponentComponent,
    CheckboxFormComponent,
    IndustryQueryComponent,
  ],
  bootstrap: [MycomponentComponent],
  exports: [
    MycomponentComponent,
    CheckboxFormComponent,
    IndustryQueryComponent,
  ],
})
export class MymoduleModule {}
