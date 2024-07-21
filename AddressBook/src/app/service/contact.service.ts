import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { Contact } from '../model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  url = 'https://address-book-server-cwsd.onrender.com';
  emailUrl = 'https://emailvalidation.abstractapi.com/v1/';
  apikey='2a7431d3fcc6419486df333b226b81a7'

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

  verifyEmail(emailValue: string) {
    let params = {api_key: this.apikey, email: emailValue};
    return this.http.get(this.emailUrl,{params: params})
  }
}