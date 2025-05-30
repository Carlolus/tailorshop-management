import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { CatalogService } from '../../../core/services/catalog/catalog.service';
import { CatalogItem } from '../../../core/models/catalog.model';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent {
  catalogItems: CatalogItem[] = [];
  filteredItems: CatalogItem[] = [];
  searchControl = new FormControl('');
  private destroy$ = new Subject<void>();

  constructor(private catalogService: CatalogService) {
    this.catalogService.getCatalog().subscribe((data) => {
      this.catalogItems = data;
      this.filteredItems = [...data];
    });

    this.setupSearch();
  }

  private setupSearch(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(term => {
        this.filterItems(term || '');
      });
  }

  private filterItems(term: string): void {
    const normalized = term.toLowerCase();
    this.filteredItems = this.catalogItems.filter(item =>
      //(item.name?.toLowerCase().includes(normalized) || '') ||
      (item.description?.toLowerCase().includes(normalized) || '')
    );
  }

  scrollToSection() {
    const element = document.getElementById('colecciones');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
