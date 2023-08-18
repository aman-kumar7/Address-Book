import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { Contact } from '../model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  url = 'http://localhost:8000/contacts';
  private contactFormSubmitted = new Subject<any>();
  isContactFormChanged = this.contactFormSubmitted.asObservable();

  constructor(private http: HttpClient) { }

  getContactList(): Observable<any> {
    return this.http.get(this.url)
  }
  
  contactFormChanged() {
    this.contactFormSubmitted.next();    
  }

  addContact(data: any) {    
    return this.http.post(this.url, data);
  }
 
  getContactById(id: number): Observable<any> {   
    return this.http.get(`${this.url}/${id}`)
  }

  deleteContact(id: number) {
    return this.http.delete(`${this.url}/${id}`)
  }
  
  updateContact(id: number, data: Contact) {
    return this.http.put(`${this.url}/${id}`, data)
  }
}