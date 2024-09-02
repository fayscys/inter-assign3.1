import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.page.html',
  styleUrls: ['./edit-post.page.scss'],
})
export class EditPostPage implements OnInit {
  post = {
    id: '',
    title: '',
    content: '',
    category: '',
    date: '',
    edited: ''  // Added field to track edit timestamp
  };

  private apiKey = '$2a$10$Pjo.Uw6T477fr03n1GUrveeCl.0Q6Au6vcfp6gHXUfaJLTFcD9EOO'; 
  private binId = '66d41b23e41b4d34e4286c32';

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      this.loadPost(postId);
    } else {
      console.error('Post ID is null');
    }
  }

  loadPost(postId: string | null) {
    const url = `https://api.jsonbin.io/v3/b/${this.binId}/latest`;
    this.http.get(url, {
      headers: { 'X-Master-Key': this.apiKey }
    }).subscribe((response: any) => {
      const posts = response.record.posts || [];
      const post = posts.find((p: any) => p.id === postId);
      if (post) {
        this.post = { ...post };  // Pre-fill the form with the post data
      }
    }, error => {
      console.error('Error loading post:', error);
    });
  }

  onSubmit() {
    this.post.edited = new Date().toISOString();  // Set edit timestamp

    const url = `https://api.jsonbin.io/v3/b/${this.binId}`;
    this.http.get(url, {
      headers: { 'X-Master-Key': this.apiKey }
    }).subscribe((response: any) => {
      const posts = response.record.posts || [];
      const postIndex = posts.findIndex((p: any) => p.id === this.post.id);
      if (postIndex !== -1) {
        posts[postIndex] = this.post;  // Replace the existing post with the edited one
      }

      this.http.put(url, { posts: posts }, {
        headers: { 'X-Master-Key': this.apiKey }
      }).subscribe(response => {
        console.log('Post updated:', response);
        this.router.navigate(['/blog-list']); // Redirect to the blog list after editing
      }, error => {
        console.error('Error updating post:', error);
      });
    }, error => {
      console.error('Error fetching posts:', error);
    });
  }
}

