import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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
    edited: ''  // Field to track edit timestamp
  };

  constructor(
    private route: ActivatedRoute, 
    private firestore: AngularFirestore, 
    private router: Router
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
        this.post = { ...post, id: postId };  // Pre-fill the form with the post data, and ensure the ID is set
      }
    }, error => {
      console.error('Error loading post:', error);
    });
  }

  onSubmit() {
    this.post.edited = new Date().toISOString();  // Set edit timestamp

    this.firestore.collection('posts').doc(this.post.id).update(this.post).then(() => {
      console.log('Post updated successfully');
      this.router.navigate(['/blog-list']); // Redirect to the blog list after editing
    }).catch(error => {
      console.error('Error updating post:', error);
    });
  }
}
