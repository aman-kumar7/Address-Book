import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
    apiUrl = 'https://address-book-server-cwsd.onrender.com/';

  constructor(private http: HttpClient) {

  }

  addNewUser(user: any){
    let url = this.apiUrl + 'users';
    return this.http.post(url, user);
  }

}