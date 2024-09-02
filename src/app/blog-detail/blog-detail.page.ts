import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.page.html',
  styleUrls: ['./blog-detail.page.scss'],
})
export class BlogDetailPage implements OnInit {
  post: any;
  private apiKey = '$2a$10$Pjo.Uw6T477fr03n1GUrveeCl.0Q6Au6vcfp6gHXUfaJLTFcD9EOO'; 
  private binId = '66d41b23e41b4d34e4286c32';

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const postId: string | null = this.route.snapshot.paramMap.get('id');
    if (postId) {
      this.loadPost(postId);
    } else {
      console.error('Post ID is null');
    }
  }

  loadPost(postId: string) {
    const url = `https://api.jsonbin.io/v3/b/${this.binId}/latest`;
    this.http.get(url, {
      headers: { 'X-Master-Key': this.apiKey }
    }).subscribe((response: any) => {
      const posts = response.record.posts || [];
      this.post = posts.find((p: any) => p.id === postId);
    }, error => {
      console.error('Error loading post:', error);
    });
  }

  onDelete() {
    const url = `https://api.jsonbin.io/v3/b/${this.binId}/latest`;
    this.http.get(url, {
      headers: { 'X-Master-Key': this.apiKey }
    }).subscribe((response: any) => {
      let posts = response.record.posts || [];
      posts = posts.filter((p: any) => p.id !== this.post.id); // Remove the post from the list

      // Update the JSON Bin with the filtered posts
      this.http.put(`https://api.jsonbin.io/v3/b/${this.binId}`, { posts: posts }, {
        headers: { 'X-Master-Key': this.apiKey }
      }).subscribe(() => {
        console.log('Post deleted');
        this.router.navigate(['/blog-list']); // Redirect to the blog list after deletion
      }, error => {
        console.error('Error deleting post:', error);
      });
    }, error => {
      console.error('Error fetching posts:', error);
    });
  }
}

