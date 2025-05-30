import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CatalogItem } from '../../../../core/models/catalog.model';
import { Fabric } from '../../../../core/models/fabric.model';
import { FabricService } from '../../../../core/services/fabrics/fabric.service';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalog-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './catalog-form.component.html',
  styleUrls: ['./catalog-form.component.scss']
})
export class CatalogFormComponent implements OnChanges, OnInit, OnDestroy {
  @Input() catalog: CatalogItem | null = null;
  @Input() isViewMode: boolean = false;

  @Output() save = new EventEmitter<CatalogItem>();
  @Output() close = new EventEmitter<void>();

  catalogForm: FormGroup;
  fabrics: Fabric[] = [];
  isLoadingFabrics = true;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private fabricService: FabricService
  ) {
    this.catalogForm = this.fb.group({
      item_id: [0],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      image: ['', [Validators.required, Validators.pattern(/https?:\/\/.+\.(jpeg|jpg|png|gif)/i)]],
      fabric: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadFabrics();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['catalog']) {
      if (this.catalog) {
        this.catalogForm.patchValue({
          item_id: this.catalog.item_id,
          description: this.catalog.description,
          image: this.catalog.image,
          fabric: this.catalog.fabric
        });
      } else {
        this.catalogForm.reset({
          item_id: 0,
          description: '',
          image: '',
          fabric: ''
        });
      }
    }

    // Deshabilitar formulario si está en modo solo lectura
    if (this.isViewMode) {
      this.catalogForm.disable();
    } else {
      this.catalogForm.enable();
    }
  }

  loadFabrics(): void {
    this.isLoadingFabrics = true;
    this.fabricService.getFabrics()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (fabrics) => {
          this.fabrics = fabrics;
          this.isLoadingFabrics = false;
        },
        error: (err) => {
          console.error('Error loading fabrics:', err);
          this.isLoadingFabrics = false;
        }
      });
  }

  getFabricById(fabricId: string | number): Fabric | undefined {
    return this.fabrics.find(fabric => fabric.fabric_id == fabricId);
  }

  onSubmit(): void {
    if (this.catalogForm.valid) {
      const formValue = this.catalogForm.value;
      const catalogItem: CatalogItem = {
        item_id: formValue.item_id || undefined,
        description: formValue.description,
        image: formValue.image,
        fabric: formValue.fabric
      };
      this.save.emit(catalogItem);
    } else {
      // Marcar todos los controles como tocados para mostrar errores
      this.catalogForm.markAllAsTouched();
    }
  }

  onClose(): void {
    this.close.emit();
  }
}