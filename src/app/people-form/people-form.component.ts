import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from '../model/person.model';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-people-form',
  templateUrl: './people-form.component.html',
  styleUrls: ['./people-form.component.css']
})
export class PeopleFormComponent implements OnInit {
  personForm : FormGroup;
  submitted = false;
  @Input('person') person: Person;
  @Output() showFormEmitter = new EventEmitter<boolean>();
  @Output() personEmitter = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if (this.person) {
      this.personForm = this.formBuilder.group({
        firstName: [this.person.firstName, [Validators.required, Validators.maxLength(50), Validators.minLength(1)]],
        lastName:[this.person.lastName, [Validators.required, Validators.maxLength(50), Validators.minLength(1)]],
        gender: [this.person.gender, Validators.required],
        birthDay: [ formatDate(this.person.birthDay, "yyyy-MM-dd HH:mm:ss", "en"), Validators.required],
        code: [this.person.phoneNumber.split(' ')[0], [Validators.required, Validators.max(999), Validators.min(1)]],
        number: [this.person.phoneNumber.split(' ')[1], [Validators.required, Validators.max(99999999), Validators.min(10000000)]],
        email: [this.person.email, [Validators.required, Validators.email]]
      });
    } else {
      this.personForm = this.formBuilder.group({
        firstName: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(1)]],
        lastName:['', [Validators.required, Validators.maxLength(50), Validators.minLength(1)]],
        gender: ['', Validators.required],
        birthDay: [new Date(), Validators.required],
        code: [0, [Validators.required, Validators.max(999), Validators.min(1)]],
        number: [0, [Validators.required, Validators.max(99999999), Validators.min(10000000)]],
        email: ['', [Validators.required, Validators.email]]
      });
    }
    
  }

  get controls() { return this.personForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    if (this.personForm.invalid) {
      return;
    }

    const newPerson: Person = {
      id: this.person ? this.person.id : 0,
      firstName: this.personForm.value.firstName,
      lastName: this.personForm.value.lastName,
      gender: (this.personForm.value.gender as string).toLowerCase(),
      birthDay: this.personForm.value.birthDay as Date,
      phoneNumber: this.personForm.value.code + " " + this.personForm.value.number,
      email: this.personForm.value.email as string
    };

    let data : any = {};
    if (this.person) {
      data = {
        isEdit: true,
        person: newPerson
      };
    } else {
      data = {
        isEdit: false,
        person: newPerson
      };
    }

    this.personEmitter.emit(data);
    this.submitted = false;
    this.personForm.reset();
  }

  toggleForm() { this.showFormEmitter.emit(false); }
}
