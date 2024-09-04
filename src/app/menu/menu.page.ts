import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  categories: any[] = [];

  constructor(private firestore: AngularFirestore, private router: Router) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.firestore.collection('categories').valueChanges().subscribe((data: any[]) => {
      this.categories = data;
    }, error => {
      console.error('Error loading categories:', error);
    });
  }

  navigateToCategory(category: string) {
    this.router.navigate(['/blog-list'], { queryParams: { category } });
  }
}

