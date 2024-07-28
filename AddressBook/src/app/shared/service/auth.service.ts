import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  apiUrl = 'https://address-book-server-cwsd.onrender.com/';
  emailUrl = "https://emailvalidation.abstractapi.com/v1/";
  apikey = "2a7431d3fcc6419486df333b226b81a7";

  constructor(private http: HttpClient) {}

  verifyEmail(emailValue: string) {
    let params = { api_key: this.apikey, email: emailValue };
    return this.http.get(this.emailUrl, { params: params });
  }

  checkIsEmailExists(email: string): Observable<boolean> {
    //const params = new HttpParams().set('email', email);
    const params = {
        email: email
    }
    return this.http.get<any[]>(this.apiUrl, { params:  params}).pipe(
      map(users => users.length > 0) // Returns true if users found, otherwise false
    );
  }

  loginUser(params: any): Observable<any> {
    let url = this.apiUrl + 'users';
    const credentials = {
        email : params.email,
        password: params.password,
    }
    return this.http.get(url, {params: credentials}).pipe(
        map((users: any) => { if(users.length > 0){
            return { 
                ...users[0], isAuthenticated: true
            } 
        }  else{
            return {
                isAuthenticated: false
            }
        } }), // Check if user exists
        catchError(() => of(false)) // Handle errors
      );
  }

  logoutUser(){
    sessionStorage.removeItem("userData");
  }

  getUser(){
    let userData = sessionStorage.getItem("userData");

    if(userData){
        return JSON.parse(userData);
    } else {
        return null;
    }
  }

  getusers(){
    let url = this.apiUrl + 'users';
    return this.http.get(url);
  }
}
