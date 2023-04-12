import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Person } from '../model/person.model';


@Component({
  selector: 'app-people-table',
  templateUrl: './people-table.component.html',
  styleUrls: ['./people-table.component.css']
})
export class PeopleTableComponent {
  @Input('people') people: Array<Person> = [];
  @Input('showForm') showForm: boolean;
  @Output() personEventEmitter = new EventEmitter<any>();

  emitPerson(person: Person, isEdit: boolean) {
    this.personEventEmitter.emit({
      person: person,
      isEdit: isEdit,
    });
  }
}
