import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { HttpEventType } from '@angular/common/http';

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
    this.postService.getPosts();

    // fetch posts using GET request with typed response
    this.postService.getPostsWthTypedResponse();
  }

  downloadFile() {
    this.postService.downloadFile();
  }

  handleError() {
    //handing error from API
    this.postService.handleErrors();
  }

  getPostByIdParam(id: number) {
    // fetch post by using GET request with query-parameter
    this.postService.getPostByIdParam(id);
  }

  getPostByIdPathVariable(id: number) {
    //fetch post by using GET request with path-variable
    this.postService.getPostByIdPathVariable(id);
  }

  getPostByMultipleParam() {
    //fetch post by using GET request with mulitple parameters
    this.postService.getPostByMultipleParam();
  }

  getFullResponse() {
    //get full-response from API
    this.postService.getFullResponse();
  }

  getResponseByEvents() {
    this.postService.getResponseByEvents();
  }


  updatePost() {
    //update post using PUT request without type
    this.postService.updatePost();

    //update post using PUT request with type
    this.postService.updatePostWithType();

    //update post using PUT request with paramteres
    this.postService.updatePostByParameter();
  }

  createNewPost() {
    //create post using POST request 
    this.postService.createNewPost();
    this.postService.createPostWithParamters();
  }

  deletePost() {
    //delete post using DELETE request
    this.postService.deletePost();
    this.postService.deletePostWithParameter();
  }

  setHeaderToGet() {
    //set headers to the GET request
    this.postService.setHeaderToGet();
  }


  setHeaderToPut() {
    //set headers to the PUT request
    this.postService.setHeaderToPut();
  }

  setHeaderToPost() {
    //set headers to the POST request
    this.postService.setHeaderToPost();
  }

  setHeaderToDelete() {
    //set headers to the DELETE request
    this.postService.setHeaderToDelete();
  }
  requestAPI() {
    //create http request using requestAPI
    this.postService.requseAPI();
  }

  uploadFile(inputFile) {
    this.postService.uploadFile(inputFile);
  }

  passFormData(fileInput) {
    this.postService.passFormData(fileInput);
  }


}
