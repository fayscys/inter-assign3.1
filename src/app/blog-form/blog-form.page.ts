import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
    imageUrl: '' // Stores the Base64 image string
  };

  newCategory: string = ''; // For the new category input
  categories: string[] = []; // Array to hold categories

  private apiKey = '$2a$10$Pjo.Uw6T477fr03n1GUrveeCl.0Q6Au6vcfp6gHXUfaJLTFcD9EOO'; 
  private binId = '66d41b23e41b4d34e4286c32'; 
  private apiUrl = `https://api.jsonbin.io/v3/b/${this.binId}`; 

  constructor(private http: HttpClient, private router: Router) {
    this.loadCategories();
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

  // Load categories from JSONBin
  loadCategories() {
    this.http.get(this.apiUrl, {
      headers: { 'X-Master-Key': this.apiKey }
    }).subscribe((response: any) => {
      if (response && response.record && response.record.categories) {
        this.categories = response.record.categories;
      }
    }, error => {
      console.error('Error loading categories:', error);
    });
  }

  // Add a new category
  addCategory() {
    if (this.newCategory.trim() && !this.categories.includes(this.newCategory.trim())) {
      this.categories.push(this.newCategory.trim());
      this.newCategory = '';
      this.saveCategories(); // Save the updated categories list
    }
  }

  // Save categories to JSONBin
  saveCategories() {
    this.http.put(this.apiUrl, { categories: this.categories }, {
      headers: { 'X-Master-Key': this.apiKey }
    }).subscribe(response => {
      console.log('Categories updated:', response);
      this.loadCategories(); // Reload categories to reflect updates
    }, error => {
      console.error('Error updating categories:', error);
    });
  }

  // Submit the blog post
  onSubmit() {
    this.post.id = new Date().getTime().toString(); // Assign unique ID
    this.post.date = new Date().toISOString(); // Auto-stamp date and time

    // Fetch existing posts from JSONBin
    this.http.get(this.apiUrl, {
      headers: { 'X-Master-Key': this.apiKey }
    }).subscribe((response: any) => {
      const existingPosts = response.record.posts || [];

      // Add the new post to the existing posts array
      existingPosts.push(this.post);

      // Update JSONBin with the new posts array
      this.http.put(this.apiUrl, { posts: existingPosts, categories: this.categories }, {
        headers: { 'X-Master-Key': this.apiKey }
      }).subscribe(response => {
        console.log('Post saved:', response);
        this.router.navigate(['/']); // Redirect to home page after submission
      }, error => {
        console.error('Error saving post:', error);
      });
    }, error => {
      console.error('Error fetching existing posts:', error);
    });
  }
}



