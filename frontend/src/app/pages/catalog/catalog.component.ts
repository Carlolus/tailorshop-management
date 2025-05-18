import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogService } from '../../core/services/catalog/catalog.service';
import { CatalogItem } from '../../core/models/catalog.model';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent {
  catalogItems: CatalogItem[] = [];

  constructor(private catalogService: CatalogService) {
    this.catalogService.getCatalog().subscribe((data) => {
      this.catalogItems = data;
    });
  }

  scrollToSection() {
    const element = document.getElementById('colecciones');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
