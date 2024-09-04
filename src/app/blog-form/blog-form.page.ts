import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.page.html',
  styleUrls: ['./blog-form.page.scss'],
})
export class BlogFormPage {
  post = {
    id: '',
    title: '',
    content: '',
    category: '',
    date: '',
    imageUrl: ''
  };

  newCategory: string = ''; // For the new category input
  categories: string[] = []; // Array to hold categories

  constructor(private firestore: AngularFirestore, private router: Router) {
    this.loadCategories();
  }

  // Load categories from Firebase
  loadCategories() {
    this.firestore.collection('categories').valueChanges().subscribe((categories: any) => {
      this.categories = categories.map((category: any) => category.name);
    }, error => {
      console.error('Error loading categories:', error);
    });
  }

  // Add a new category
  addCategory() {
    if (this.newCategory.trim() && !this.categories.includes(this.newCategory.trim())) {
      const category = { name: this.newCategory.trim() };
      this.firestore.collection('categories').add(category).then(() => {
        this.categories.push(this.newCategory.trim());
        this.newCategory = '';
      }).catch(error => {
        console.error('Error adding category:', error);
      });
    }
  }

  // Delete a category
  deleteCategory(category: string) {
    const categoryDoc = this.firestore.collection('categories', ref => ref.where('name', '==', category)).get();
    categoryDoc.subscribe(snapshot => {
      snapshot.forEach(doc => {
        doc.ref.delete().then(() => {
          console.log(`Category '${category}' deleted`);
          this.categories = this.categories.filter(c => c !== category);
        }).catch(error => {
          console.error('Error deleting category:', error);
        });
      });
    });
  }

  // Handle image selection
  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.post.imageUrl = reader.result as string; // Convert image to Base64 and store in post object
    };

    reader.readAsDataURL(file); // Read the file as a data URL (Base64)
  }

  // Submit the blog post
  onSubmit() {
    this.post.id = this.firestore.createId(); // Generate a unique ID
    this.post.date = new Date().toISOString(); // Auto-stamp date and time

    this.firestore.collection('posts').doc(this.post.id).set(this.post).then(() => {
      console.log('Post saved successfully');
      this.router.navigate(['/blog-list']); // Redirect to blog list after submission
    }).catch(error => {
      console.error('Error saving post:', error);
    });
  }
}



