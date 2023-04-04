import { Component } from '@angular/core';

@Component({
  selector: 'my-component',
  template: '<h1>mymodule.ts module file created successfully.</h1>',
  styles: [ 'h1{background:red;}' ]
})
export class MycomponentComponent  {
  name = 'Angular 6';
}
