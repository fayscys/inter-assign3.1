import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.page.html',
  styleUrls: ['./blog-detail.page.scss'],
})
export class BlogDetailPage implements OnInit {
  post: any; // Holds the post data

  constructor(
    private route: ActivatedRoute, 
    private firestore: AngularFirestore,
    private router: Router // Inject the Router to navigate after deletion
  ) {}

  ngOnInit() {
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      this.loadPost(postId);
    } else {
      console.error('Post ID is null');
    }
  }

  loadPost(postId: string) {
    this.firestore.collection('posts').doc(postId).valueChanges().subscribe((post: any) => {
      if (post) {
        this.post = post;  // Store the post data
      } else {
        console.error('Post not found');
      }
    }, error => {
      console.error('Error loading post:', error);
    });
  }

  onDelete() {
    if (this.post && this.post.id) {
      this.firestore.collection('posts').doc(this.post.id).delete().then(() => {
        console.log('Post deleted successfully');
        this.router.navigate(['/blog-list']); // Redirect to the blog list after deletion
      }).catch(error => {
        console.error('Error deleting post:', error);
      });
    }
  }
}
