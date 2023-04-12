import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Person } from "../model/person.model";

@Injectable({ providedIn: "root" })
export class PersonService {

  constructor(private http: HttpClient) {}

  getPeople(firstName: string | null, birthDay: number | null) {
    if (firstName != null && birthDay != null) {
      return this.http.get("http://localhost:8080/api/person?name=" + firstName + "&birthday=" + birthDay, {observe: 'response'});
    } else if (firstName != null) {
      return this.http.get("http://localhost:8080/api/person?name=" + firstName, {observe: 'response'});
    } else if (birthDay != null) {
      return this.http.get("http://localhost:8080/api/person?birthday=" + birthDay, {observe: 'response'});
    } else {
      return this.http.get("http://localhost:8080/api/person", {observe: 'response'});
    }
  }

  savePerson(person: Person) {
    return this.http.post("http://localhost:8080/api/person", this.serelizePerson(person), {observe: 'response'});
  }

  updatePerson(person: Person) {
    return this.http.put("http://localhost:8080/api/person", this.serelizePerson(person), {observe: 'response'});
  }

  deletePersonById(id: number) {
    return this.http.delete("http://localhost:8080/api/person/" + id, {observe: 'response', responseType: 'text'});
  }

  private serelizePerson(person: Person) : any {
    return {
      id: person.id,
      firstName: person.firstName,
      lastName: person.lastName,
      gender: person.gender,
      birthDay: new Date(person.birthDay).getTime(),
      phoneNumber: person.phoneNumber,
      email: person.email
    };
  }

  deserelizePerson(data: any) : Person {
    return {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      birthDay: new Date(data.birthDay),
      phoneNumber: data.phoneNumber,
      email: data.email
    };
  }
}