import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.page.html',
  styleUrls: ['./blog-list.page.scss'],
})
export class BlogListPage implements OnInit {

  posts: any[] = [];
  filteredPosts: any[] = [];
  selectedCategory: string = 'all';
  private apiKey = '$2a$10$Pjo.Uw6T477fr03n1GUrveeCl.0Q6Au6vcfp6gHXUfaJLTFcD9EOO'; 
  private binId = '66d41b23e41b4d34e4286c32';
  noPostsFound: boolean = false;  // Tracks if no posts are found

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.selectedCategory = params['category'] || 'all';
      this.loadPosts();
    });
  }

  ionViewWillEnter() {
    this.loadPosts();  // Reload the posts every time the view is about to enter
  }

  loadPosts() {
    const url = `https://api.jsonbin.io/v3/b/${this.binId}/latest`;
    this.http.get(url, {
      headers: { 'X-Master-Key': this.apiKey }
    }).subscribe((response: any) => {
      this.posts = response.record.posts || [];
      this.filterPostsByCategory();  // Filter posts when they are loaded
    }, error => {
      console.error('Error loading posts:', error);
    });
  }

  filterPostsByCategory() {
    if (this.selectedCategory === 'all') {
      this.filteredPosts = this.posts;
    } else {
      this.filteredPosts = this.posts.filter(post => post.category === this.selectedCategory);
    }
    
    // Check if no posts are found for the selected category
    this.noPostsFound = this.filteredPosts.length === 0;
  }
}


