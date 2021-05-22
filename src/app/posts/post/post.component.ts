import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

  getPosts() {
    // fetch posts using GET request
    this.postService.getPosts().subscribe(posts => console.log(posts), error => console.log(error));

    // fetch posts using GET request with typed response
    this.postService.getPostsWthTypedResponse().subscribe(posts => console.log(posts), error => console.log(error));
  }

  getPostsError() {
    //handing error from API
    this.postService.getPostsError().subscribe(data => console.log(data), error => console.log(error));
  }

  getPostByIdParam(id: number) {
    // fetch post by using GET request with query-parameter
    this.postService.getPostByIdParam(id).subscribe(post => console.log(post[0]), error => console.log(error));
  }

  getPostByIdPathVariable(id: number) {
    //fetch post by using GET request with path-variable
    this.postService.getPostByIdPathVariable(id).subscribe(post => console.log(post), error => console.log(error));
  }

  getPostByMultipleParam() {
    //fetch post by using GET request with mulitple parameters
    this.postService.getPostByMultipleParam().subscribe(post => console.log(post), error => console.log(error));
  }

  getFullResponse() {
    //get full-response from API
    this.postService.getFullResponse().subscribe(response => {
      // Full resopnse
      console.log(response);

      //headers
      console.log('Headers');
      const headersKey: string[] = response.headers.keys();
      headersKey.forEach(key => console.log(response.headers.getAll(key)));

      //status 
      console.log('Status Code', response.status);
      console.log('Status Text', response.statusText);
    }, error => console.log(error));
  }

  updatePost() {
    //update post using PUT request without type
    this.postService.updatePost().subscribe(updatedPost => window.alert(`Post updated : ${updatedPost['id']}`) , error => console.log(error));

    //update post using PUT request with type
    this.postService.updatePostWithType().subscribe(updatedPost => window.alert(`Post updated : ${updatedPost.id}`) , error => console.log(error));
  }

  createNewPost() {
    //create post using POST request 
    this.postService.createNewPost().subscribe(newPostId => console.log('New post created',newPostId), error => console.log(error));
  }

  deletePost() {
    //delete post using DELETE request
    this.postService.deletePost().subscribe(() => window.alert('Post deleted successfully'), error => console.log(error));
  }

  setHeaders() {
    //set headers to the http request
    this.postService.setHeaders().subscribe(post => console.log(post), error => console.log(error));
  }

  requestAPI() {
    //create http request using requestAPI
    this.postService.requseAPI().subscribe(posts => console.log(posts));
  }

}
