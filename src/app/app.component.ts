import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  showCategories: boolean = false;  // Tracks whether categories are shown
  selectedCategory: string = 'all';  // Tracks the selected category value
  selectedCategoryLabel: string = 'All';  // Tracks the selected category label

  constructor(private navCtrl: NavController) {}

  toggleCategories() {
    this.showCategories = !this.showCategories;  // Toggle category visibility
  }

  filterPosts(category: string) {
    this.selectedCategory = category;
    this.selectedCategoryLabel = category === 'all' ? 'All' : category;  // Update label
    this.navCtrl.navigateForward('/blog-list', {
      queryParams: { category: this.selectedCategory }
    });
    this.showCategories = false;  // Optionally hide the categories after selection
  }
}
