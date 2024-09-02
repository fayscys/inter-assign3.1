import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Ensure HttpClient is imported correctly
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.page.html',
  styleUrls: ['./blog-form.page.scss'],
})
export class BlogFormPage {
  post = {
    id: '',      // Added ID property to the post object
    title: '',
    content: '',
    category: '',
    date: ''
  };

  private apiKey = '$2a$10$Pjo.Uw6T477fr03n1GUrveeCl.0Q6Au6vcfp6gHXUfaJLTFcD9EOO'; 
  private binId = '66d41b23e41b4d34e4286c32'; 
  private apiUrl = `https://api.jsonbin.io/v3/b/${this.binId}`; 

  constructor(private http: HttpClient, private router: Router) {}  // HttpClient injected in constructor

  onSubmit() {
    // Assign a unique ID using the current timestamp
    this.post.id = new Date().getTime().toString(); 

    // Auto-stamp date and time
    this.post.date = new Date().toISOString();

    console.log('Submitting post:', this.post);

    // Fetch existing posts from the bin
    this.http.get(this.apiUrl, {
      headers: { 'X-Master-Key': this.apiKey }
    }).subscribe((response: any) => {
      const existingPosts = response.record.posts || [];

      // Append the new post to the existing posts
      existingPosts.push(this.post);

      // Update the bin with the new post array
      this.http.put(this.apiUrl, { posts: existingPosts }, {
        headers: { 'X-Master-Key': this.apiKey }
      }).subscribe(response => {
        console.log('Post saved:', response);
        this.router.navigate(['/']); // Redirect to the home page after submission
      }, error => {
        console.error('Error saving post:', error);
      });
    }, error => {
      console.error('Error fetching existing posts:', error);
    });
  }
}


