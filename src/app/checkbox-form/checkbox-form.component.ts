import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkbox-form',
  templateUrl: './checkbox-form.component.html',
  styleUrls: ['./checkbox-form.component.css'],
})
export class CheckboxFormComponent implements OnInit {
  form: FormGroup;
  types: string[];

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit() {
    // we need to initialize the form group before the dynamic call is made.
    this.form = this.fb.group({
      name: ['', Validators.required],
    });

    this.http
      .get<string[]>('https://takehometest.azurewebsites.net/Data/types')
      .subscribe((types) => {
        this.types = types;
        this.createForm();
      });
  }

  createForm() {
    const controls = this.types.reduce((acc, type) => {
      acc[type] = [false];
      return acc;
    }, {});

    //this.form = new FormGroup({});
    //this.form = this.fb.group(controls || {});
    this.form = this.fb.group(
      controls || {
        name: ['', Validators.required],
      }
    );
  }

  onSubmit() {
    const selectedTypes = this.types.filter((type) => this.form.value[type]);

    // Send selected types as payload
    this.http
      .post('https://takehometest.azurewebsites.net/Data/submit', selectedTypes)
      .subscribe((response) => {
        console.log(response);
      });
  }
}
