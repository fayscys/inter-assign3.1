import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.page.html',
  styleUrls: ['./blog-list.page.scss'],
})
export class BlogListPage implements OnInit {

  posts: any[] = [];
  filteredPosts: any[] = [];
  selectedCategory: string = 'all';
  noPostsFound: boolean = false;

  constructor(private firestore: AngularFirestore, private route: ActivatedRoute) {}

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
    this.firestore.collection('posts', ref => ref.orderBy('date', 'desc'))  // Order by date in descending order
      .valueChanges({ idField: 'id' })
      .subscribe((data: any[]) => {
        this.posts = data;
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



