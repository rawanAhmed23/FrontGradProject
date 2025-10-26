import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemService } from '../../shared/item-service';
import { Item } from '../../models/item';

@Component({
  selector: 'app-menu',
  imports: [CommonModule],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu implements OnInit {
  allItems: Item[] = [];
  menuItems: Item[] = [];
  categories: string[] = [];
  selectedCategory = '';
  loading = true;
  error = '';

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.loadAllItems();
  }

  loadAllItems() {
    this.itemService.getAll().subscribe({
      next: (data) => {
        this.allItems = data;
        this.menuItems = data;
        this.categories = ['All', ...this.getUniqueCategories(data)];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching items:', err);
        this.error = 'حدث خطأ أثناء تحميل المنتجات';
        this.loading = false;
      },
    });
  }

  getUniqueCategories(items: Item[]): string[] {
    const unique = new Set(items.map((i) => i.category));
    return Array.from(unique);
  }

  filterItems(category: string) {
    this.selectedCategory = category;
    if (category === 'All') {
      this.menuItems = this.allItems;
    } else {
      this.menuItems = this.allItems.filter(
        (item) => item.category.toLowerCase() === category.toLowerCase()
      );
    }
  }

}
