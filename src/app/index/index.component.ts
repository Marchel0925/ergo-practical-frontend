import { Component, OnInit} from '@angular/core';
import { Person } from '../model/person.model';
import { PersonService } from '../service/person.service';
import { getMessageDataFromStatus } from '../utils/getMessageDataFromStatus';



@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  showForm : boolean = false;
  people : Array<Person> = [];
  message: any;
  alertHidden: boolean = true;
  personToEdit: Person | null;

  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.personService.getPeople(null, null).subscribe((response: any) => {
      this.populatePeopleList(response.body.data);
    });
  }

  tableActionHandler(data: any) {
    if (data.isEdit) {
      this.personToEdit = data.person;
      this.toggleForm();
    } else {
      const flag: boolean = confirm("Are you sure to delete person \"" + data.person.email + "\"? This action cannot be undone.");
      if (flag) {
        this.deletePerson(data.person.id);
      }
    }
  }

  formActionHandler(data: any) {
    if (data.isEdit) {
      this.personService.updatePerson(data.person).subscribe((response : any) => {
        if (response.status == 200) {
          this.people = this.people.map(person => {
            if(person.id == response.body.data.id) {
              person = this.personService.deserelizePerson(response.body.data);
            }
            return person;
          });
        }
        this.message = getMessageDataFromStatus(response.status, response.body.message);
        this.alertHidden = false;
      });
    } else {
      this.personService.savePerson(data.person).subscribe((response: any) => {
        if (response.status == 201) {
          console.log(response.body);
          this.people = this.people.concat(this.personService.deserelizePerson(response.body.data));
        }
        this.message = getMessageDataFromStatus(response.status, response.body.message);
        this.alertHidden = false;
      });
    }
    this.toggleForm();
  }

  updateShowForm(showForm: boolean) { this.showForm = showForm; this.personToEdit = null; }

  deletePerson(id: number) {
    this.personService.deletePersonById(id).subscribe(response => {
      console.log(response.status);
      if (response.status == 200) {
        this.people = this.people.filter(person => person.id != id);
      }
      this.message = getMessageDataFromStatus(response.status, response.body);
      this.alertHidden = false;
    });
  }

  hideAlert() {
    this.alertHidden = true;
    this.message = null;
  }

  searchPeopleHandler(data: any) : void {
    console.log(data);
    const date = data.birthDay != null ? new Date(data.birthDay).getTime() : null;
    const name = data.name != null ? data.name : null;

    this.personService.getPeople(name, date).subscribe((response: any) => {
      if (response.status == 200) {
        this.populatePeopleList(response.body.data);
      }
    });
  }

  populatePeopleList(list: any) {
    this.people = [...list.map((person: any) => { return this.personService.deserelizePerson(person); })];
  }

  toggleForm() { this.showForm = !this.showForm; }

}
