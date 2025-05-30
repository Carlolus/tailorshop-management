import { Component, OnInit, OnDestroy } from '@angular/core';
import { CatalogItem } from '../../../core/models/catalog.model';
import { CatalogService } from '../../../core/services/catalog/catalog.service';
import { FabricService } from '../../../core/services/fabrics/fabric.service';
import { Fabric } from '../../../core/models/fabric.model';
import { Subject, takeUntil, forkJoin } from 'rxjs';
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
  fabrics: Fabric[] = [];
  isLoading = true;
  private destroy$ = new Subject<void>();
  showForm = false;
  isViewMode = false;
  selectedCatalog: CatalogItem | null = null;
  searchTerm: string = '';

  constructor(
    private catalogService: CatalogService,
    private fabricService: FabricService,
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
    
    // Cargar catálogos y telas en paralelo
    forkJoin({
      catalogs: this.catalogService.getCatalog(),
      fabrics: this.fabricService.getFabrics()
    }).pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ catalogs, fabrics }) => {
          this.catalogs = catalogs;
          this.fabrics = fabrics;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading data:', err);
          this.isLoading = false;
        }
      });
  }

  // Método para obtener la tela por ID
  getFabricById(fabricId: string | number): Fabric | undefined {
    return this.fabrics.find(fabric => fabric.fabric_id == fabricId);
  }

  // Getter que se ejecuta automáticamente cuando cambia searchTerm
  get filteredCatalogs() {
    if (!this.searchTerm.trim()) return this.catalogs;
    const term = this.searchTerm.toLowerCase();
    return this.catalogs.filter(catalog => {
      // Buscar por ID
      const matchesId = catalog.item_id?.toString().includes(term);
      
      // Buscar por descripción
      const matchesDescription = catalog.description?.toLowerCase().includes(term);
            
      return matchesId || matchesDescription 
    });
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