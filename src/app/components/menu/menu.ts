// 📁 src/app/components/menu/menu.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemService } from '../../shared/item-service';
import { Item } from '../../models/item';
import {
  trigger,
  style,
  transition,
  animate,
  query,
  stagger,
} from '@angular/animations';

@Component({
  selector: 'app-menu',
  imports: [CommonModule],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
  animations: [
    trigger('fadeInStagger', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(15px)' }),
            stagger('120ms', [
              animate(
                '600ms ease-out',
                style({ opacity: 1, transform: 'translateY(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('200ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class Menu implements OnInit {
  allItems: Item[] = [];
  menuItems: Item[] = [];
  categories: string[] = [];
  selectedCategory = '';
  loading = true;
  error = '';

  // ✅ بيانات الـ Modal
  selectedItem: Item | null = null;
  sizes: any[] = [];
  sizesLoading = false;
  sizesError = '';

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
    this.menuItems =
      category === 'All'
        ? this.allItems
        : this.allItems.filter(
            (item) => item.category.toLowerCase() === category.toLowerCase()
          );
  }

  // ✅ عرض تفاصيل المنتج وفتح المودال
  viewDetails(item: Item) {
    this.selectedItem = item;
    this.sizes = [];
    this.sizesError = '';
    this.sizesLoading = true;

    this.itemService.getItemSizes(item.id).subscribe({
      next: (data) => {
        this.sizes = data;
        this.sizesLoading = false;
      },
      error: (err) => {
        console.error('Error fetching sizes:', err);
        this.sizesError = 'تعذر تحميل الأحجام لهذا المنتج.';
        this.sizesLoading = false;
      },
    });
  }

  // ✅ إغلاق المودال
  closeModal() {
    this.selectedItem = null;
    this.sizes = [];
  }
}
