import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class PostService {
    baseUrl = 'https://address-book-server-cwsd.onrender.com/'
    constructor(private http: HttpClient){

    }

    getPost(params?: any){
        let url = this.baseUrl + 'post'
        return this.http.get(url)
    }

    createPost(post: any): Observable<any> {
        let url = this.baseUrl + 'post'
        return this.http.post(url,post)
    }

    deletePost(id: number){
        let url = this.baseUrl + 'post' + id;
        return this.http.delete(url)
    }

}