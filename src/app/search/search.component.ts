import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchForm = null;
  @Output() searchEmitter = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      name: [null],
      birthDay: [null]
    });
  }

  reset() {
    this.searchForm.reset();
    this.searchEmitter.emit({
      name: null,
      birthDay: null
    });
  }

  onSubmit() {
    this.searchEmitter.emit({
      name: this.searchForm.value.name == '' ? null : this.searchForm.value.name,
      birthDay: this.searchForm.value.birthDay
    });
  }

}
