import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { CatalogService } from '../../../core/services/catalog/catalog.service';
import { CatalogItem } from '../../../core/models/catalog.model';

import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger
} from '@angular/animations';

const listAnimation = trigger('listAnimation', [
  transition('* <=> *', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(20px)' }),
      stagger(100, [
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ], { optional: true }),
    query(':leave', [
      stagger(100, [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
      ])
    ], { optional: true }),
  ])
]);

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
  animations: [
    trigger('listAnimation', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(20px)' }),
            stagger('100ms', [
              animate(
                '300ms ease-out',
                style({ opacity: 1, transform: 'translateY(0)' })
              )
            ])
          ],
          { optional: true }
        ),
        query(
          ':leave',
          [
            stagger('100ms', [
              animate(
                '200ms ease-out',
                style({ opacity: 0, transform: 'translateY(20px)' })
              )
            ])
          ],
          { optional: true }
        )
      ])
    ])
  ]
})
export class CatalogComponent implements OnDestroy {
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
      item.description?.toLowerCase().includes(normalized)
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

   selectedItem: CatalogItem | null = null;
   isViewMode = false; //

openModal(item: CatalogItem) {
  this.selectedItem = item;
}

closeModal() {
  this.selectedItem = null;
}
}
