import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { Contact } from '../model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  url = 'https://address-book-server-cwsd.onrender.com';

  private contactFormSubmitted = new Subject<any>();
  isContactListChanged = this.contactFormSubmitted.asObservable();

  constructor(private http: HttpClient) { }

  contactListUpdated(){
    this.contactFormSubmitted.next();
  }

  getContactList(): Observable<any> {
    return this.http.get(`${this.url}/contacts`)
  }
  
  contactFormChanged() {
    this.contactFormSubmitted.next();    
  }

  addContact(data: any): Observable<any> {    
    return this.http.post(`${this.url}/contacts/`, data);
  }
 
  getContactById(id: number): Observable<any> {   
    return this.http.get(`${this.url}/contacts/${id}`)
  }

  deleteContact(id: number): Observable<any> {
    return this.http.delete(`${this.url}/contacts/${id}`)
  }
  
  updateContact(id: number, data: Contact) {
    return this.http.put(`${this.url}/contacts/${id}`, data)
  }

  
}