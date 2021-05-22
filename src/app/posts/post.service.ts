import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
import { environment } from '../../environments/environment';
import { Post } from './post.model';
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  jsonPlaceholderBaseUrl: string;
  exampleImageUrl: string = "https://images.unsplash.com/photo-1542947370-a12ec0428dce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80";
  uploadFileUrl: string = 'https://us-central1-tutorial-e6ea7.cloudfunctions.net/fileUpload';

  constructor(private http: HttpClient) {
    this.jsonPlaceholderBaseUrl = environment.jsonPlaceholderBaseUrl;   // https://jsonPlaceholderBaseUrl.typicode.com
  }

  createHeaders() {
    let headers = new HttpHeaders().set('Content-Type', 'application/text');
    if (!headers.has('authentication')) {
      headers = headers.append('authentication', `AKYOPVvew32BU5w1543qqOrsNSP`);
    }
    return headers;
  }








  getPosts() {
    //without typed response
    return this.http.get(`${this.jsonPlaceholderBaseUrl}/posts`)
      .subscribe(posts => console.log(posts));
  }

  getPostsWthTypedResponse() {
    // typed http response(Post[])
    return this.http.get<Post[]>(`${this.jsonPlaceholderBaseUrl}/posts`)
      .subscribe(posts => console.log(posts));
  }

  getPostByIdParam(id: number) {
    let params = new HttpParams().set('id', id.toString());
    return this.http.get<Post>(`${this.jsonPlaceholderBaseUrl}/posts`, { params: params })
      .subscribe(post => console.log(post[0]));
  }

  getPostByMultipleParam() {
    let params = new HttpParams();
    params = params.append('id', '1');
    params = params.append('page', '2');
    return this.http.get<Post>(`${this.jsonPlaceholderBaseUrl}/posts`, { params: params })
      .subscribe(post => console.log(post));
  }

  getPostByIdPathVariable(id: number) {
    return this.http.get<Post>(`${this.jsonPlaceholderBaseUrl}/posts/${id}`)
      .subscribe(post => console.log(post));
  }

  downloadFile() {
    return this.http.get(this.exampleImageUrl, { responseType: 'blob' }).subscribe(
      fileData => {

        //  To open file in new  window
        // let blob: any = new Blob([fileData], { type: 'image/*' });
        // const url = window.URL.createObjectURL(blob);
        // window.open(url);

        // To save file 
        FileSaver.saveAs(fileData, 'employees.jpg');
      }
    );
  }

  setHeaderToGet() {
    return this.http.get(`${this.jsonPlaceholderBaseUrl}/posts/2`,
      { headers: this.createHeaders() })
      .subscribe(post => console.log(post));
  }







  createNewPost() {
    const newPost = {
      body: 'Craeted new post',
      title: 'Santino D\'Antonio',
      userId: 12
    };
    return this.http.post(`${this.jsonPlaceholderBaseUrl}/posts`, newPost).
      subscribe(newPostId => console.log('New post created', newPostId));
  }

  createPostWithParamters() {
    const newPost = {
      body: 'Craeted new post with pararms',
      title: 'John Wick',
      userId: 8
    };
    let params = new HttpParams().set('userId', '85');
    params = params.append('comment', 'Not to Focus');
    return this.http.post(`${this.jsonPlaceholderBaseUrl}/posts`, newPost,
      { params: params })
      .subscribe(newPostId => console.log('New post created', newPostId));
  }

  uploadFile(fileInput) {
    const formData = new FormData();
    formData.append('files', fileInput.target.files[0]);
    return this.http.post(this.uploadFileUrl, formData).subscribe(res => {
      console.log(res);
      alert('File is uploaded');
    });
  }

  passFormData(fileInput) {
    const formData: FormData = new FormData();
    formData.append('email', 'dummy@mail.com');
    formData.append('password', 'notanissue');
    return this.http.post(this.uploadFileUrl, formData).subscribe(res => {
      console.log(res);
      alert('Form data is passed');
    });
  }

  setHeaderToPost() {
    const newPost = {
      body: 'Craeted new post',
      title: 'Santino D\'Antonio',
      userId: 12
    };
    return this.http.post(`${this.jsonPlaceholderBaseUrl}/posts`, newPost,
      { headers: this.createHeaders() })
      .subscribe(post => console.log(post));
  }








  updatePost() {
    const post = {
      body: 'Changed post body',
      title: 'Changed post title'
    };
    return this.http.put(`${this.jsonPlaceholderBaseUrl}/posts`, post)
      .subscribe(updatedPost => window.alert(`Post updated : ${updatedPost['id']}`));
  }

  updatePostByParameter() {
    const post = {
      body: 'Changed post body',
      title: 'Changed post title'
    };
    let params = new HttpParams();
    params = params.append('id', '1');
    params = params.append('page', '2');
    return this.http.put(`${this.jsonPlaceholderBaseUrl}/posts`, post,
      { params: params }).
      subscribe(updatedPost => window.alert(`Post updated : ${updatedPost}`));
  }

  updatePostWithType() {
    const post = {
      body: 'Changed post body',
      title: 'Changed post title'
    };
    return this.http.put<Post>(`${this.jsonPlaceholderBaseUrl}/posts/1`, post)
      .subscribe(updatedPost => window.alert(`Post updated : ${updatedPost.id}`));
  }

  setHeaderToPut() {
    const post = {
      body: 'Changed post body',
      title: 'Changed post title'
    };
    return this.http.put(`${this.jsonPlaceholderBaseUrl}/posts/1`, post,
      { headers: this.createHeaders() })
      .subscribe(post => console.log(post));
  }










  deletePost() {
    return this.http.delete(`${this.jsonPlaceholderBaseUrl}/posts/1`)
      .subscribe(() => window.alert('Post deleted successfully'));
  }

  deletePostWithParameter() {
    let params = new HttpParams().set('id', '17');
    return this.http.delete(`${this.jsonPlaceholderBaseUrl}/posts`,
      { params: params })
      .subscribe(() => window.alert('Post deleted successfully'));
  }

  setHeaderToDelete() {
    return this.http.delete(`${this.jsonPlaceholderBaseUrl}/posts/1`,
      { headers: this.createHeaders() })
      .subscribe(post => console.log(post));
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

  handleErrors() {
    return this.http.get<Post[]>(`${this.jsonPlaceholderBaseUrl}//posts`)
      .pipe(catchError(this.handleError))
      .subscribe(data => console.log(data), error => console.log(error));
  }








  getFullResponse() {
    // observer has three options  'body' | 'response' | 'events'
    return this.http.get<Post>(`${this.jsonPlaceholderBaseUrl}/posts/1`, { observe: 'response' }).subscribe(response => {
      // Full resopnse
      console.log(response);

      //headers
      console.log('Headers');
      const headersKey: string[] = response.headers.keys();
      headersKey.forEach(key => console.log(response.headers.getAll(key)));

      //status 
      console.log('Status Code', response.status);
      console.log('Status Text', response.statusText);
    });
  }

  getResponseByEvents() {
    return this.http.get<Post>(`${this.jsonPlaceholderBaseUrl}/posts/1`, { observe: 'events' }).subscribe((result) => {
      if (result.type === HttpEventType.Sent) {
        console.log("request sent");
      } else if (result.type === HttpEventType.Response) {
        console.log("response obtained");
      }
    });
  }






  requseAPI() {
    // also support PUT,POST,DELETE
    return this.http.request("GET", `${this.jsonPlaceholderBaseUrl}/posts`,
      { responseType: 'json', params: { 'id': '1' } })
      .subscribe(post => console.log(post));
  }

}
