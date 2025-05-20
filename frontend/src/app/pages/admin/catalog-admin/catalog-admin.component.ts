import { Component, OnInit, OnDestroy } from '@angular/core';
import { CatalogItem } from '../../../core/models/catalog.model';
import { CatalogService } from '../../../core/services/catalog/catalog.service';
import { Subject, takeUntil } from 'rxjs';
import { CatalogFormComponent } from './catalog-form/catalog-form.component';
import { DialogService } from '../../../core/services/dialog.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-catalog-admin',
  standalone: true,
  imports: [
    CatalogFormComponent,
    FormsModule,
    CommonModule
  ],
  templateUrl: './catalog-admin.component.html',
  styleUrls: ['./catalog-admin.component.scss']
})
export class CatalogAdminComponent implements OnInit, OnDestroy {
  catalogs: CatalogItem[] = [];
  isLoading = true;
  private destroy$ = new Subject<void>();
  showForm = false;
  isViewMode = false;
  selectedCatalog: CatalogItem | null = null;
  searchTerm: string = '';

  constructor(
    private catalogService: CatalogService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.loadCatalogs();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadCatalogs(): void {
    this.isLoading = true;
    this.catalogService.getCatalog()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (catalogs) => {
          this.catalogs = catalogs;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading catalogs:', err);
          this.isLoading = false;
        }
      });
  }

  get filteredCatalogs() {
    if (!this.searchTerm.trim()) return this.catalogs;
    const term = this.searchTerm.toLowerCase();
    return this.catalogs.filter(c =>
      c.name.toLowerCase().includes(term) ||
      c.description.toLowerCase().includes(term)
    );
  }

  confirmDelete(catalogId: number): void {
    this.dialogService.confirm(
      'Eliminar catálogo',
      '¿Estás seguro de que deseas eliminar este catálogo?'
    ).then(confirmed => {
      if (confirmed) this.deleteCatalog(catalogId);
    });
  }

  private deleteCatalog(catalogId: number): void {
    this.catalogService.deleteCatalogItem(catalogId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.loadCatalogs();
          this.dialogService.notify('Catálogo eliminado correctamente', '', "success");
        },
        error: (err) => {
          console.error('Error deleting catalog:', err);
          this.dialogService.notify('Error al eliminar el catálogo', 'error');
        }
      });
  }

  openCreateForm(): void {
    this.selectedCatalog = null;
    this.isViewMode = false;
    this.showForm = true;
  }

  openEditForm(catalog: CatalogItem): void {
    this.selectedCatalog = catalog;
    this.isViewMode = false;
    this.showForm = true;
  }

  openViewForm(catalog: CatalogItem): void {
    this.selectedCatalog = catalog;
    this.isViewMode = true;
    this.showForm = true;
  }

  onFormClosed(): void {
    this.showForm = false;
    this.isViewMode = false;
  }

  saveCatalog(catalog: CatalogItem): void {
    const operation = catalog.item_id
      ? this.catalogService.updateCatalogItem(catalog)
      : this.catalogService.createCatalogItem(catalog);

    operation.pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.loadCatalogs();
          this.showForm = false;
          this.dialogService.notify(
            (`Catálogo ${catalog.item_id ? 'actualizado' : 'creado'} correctamente`),
            "success"
          );
        },
        error: (err) => {
          console.error('Error saving catalog:', err);
          this.dialogService.notify('Error al guardar el catálogo', 'error');
        }
      });
  }
  trackByCatalogId(index: number, catalog: CatalogItem): number {
  return catalog.item_id ?? index;
  }
}
