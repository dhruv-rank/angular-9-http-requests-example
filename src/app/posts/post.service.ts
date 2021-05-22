import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
import { environment } from '../../environments/environment';
import { Post } from './post.model';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  jsonPlaceholder: string;

  constructor(private http: HttpClient) {
    this.jsonPlaceholder = environment.jsonPlaceholder;   // https://jsonplaceholder.typicode.com
  }

  // handle error 
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  getPosts() {
    //without typed response
    return this.http.get(`${this.jsonPlaceholder}/posts`).pipe(catchError(this.handleError));
  }

  getPostsWthTypedResponse(): Observable<Post[]> {
    // typed http response(Post[])
    return this.http.get<Post[]>(`${this.jsonPlaceholder}/posts`).pipe(catchError(this.handleError));
  }


  getPostByIdPathVariable(id: number) {
    return this.http.get<Post>(`${this.jsonPlaceholder}/posts/${id}`).pipe(catchError(this.handleError));
  }

  getPostByIdParam(id: number) {
    let params = new HttpParams().set('id', id.toString());
    return this.http.get<Post>(`${this.jsonPlaceholder}/posts`, { params: params }).pipe(catchError(this.handleError));
  }

  getPostByMultipleParam() {
    let params = new HttpParams();
    params = params.append('id', '1');
    params = params.append('page', '2');
    return this.http.get<Post>(`${this.jsonPlaceholder}/posts`, { params: params }).pipe(catchError(this.handleError));
  }

  updatePost() {
    const post = {
      body: 'Changed post body',
      title: 'Changed post title'
    }
    return this.http.put(`${this.jsonPlaceholder}/posts/1`, post).pipe(catchError(this.handleError));
  }

  updatePostWithType(): Observable<Post> {
    const post = {
      body: 'Changed post body',
      title: 'Changed post title'
    }
    return this.http.put<Post>(`${this.jsonPlaceholder}/posts/1`, post).pipe(catchError(this.handleError));
  }

  createNewPost() {
    const newPost = {
      body: 'Craeted new post',
      title: 'Santino D\'Antonio',
      userId: 12
    }
    return this.http.post(`${this.jsonPlaceholder}/posts`, newPost).pipe(catchError(this.handleError));
  }

  deletePost() {
    return this.http.delete(`${this.jsonPlaceholder}/posts/1`).pipe(catchError(this.handleError));
  }

  getPostsError() {
    return this.http.get<Post[]>(`${this.jsonPlaceholder}//posts`).pipe(catchError(this.handleError));
  }

  getFullResponse() {
    // observer has three options  'body' | 'response' | 'events'
    return this.http.get<Post>(`${this.jsonPlaceholder}/posts/1`, { observe: 'response' }).pipe(catchError(this.handleError));
  }

  setHeaders() {
    let headers = new HttpHeaders().set('Content-Type', 'application/text');
    if (!headers.has('authentication')) {
      headers = headers.append('authentication', `AKYOPVvew32BU5w1543qqOrsNSP`);
    }
    return this.http.get(`${this.jsonPlaceholder}/posts/2`, { headers: headers }).pipe(catchError(this.handleError));
  }

  requseAPI() {
    // also support PUT,POST,DELETE
    return this.http.request("GET", `${this.jsonPlaceholder}/posts`, { responseType: 'json', params: { 'id': '1' } });
  }
}
