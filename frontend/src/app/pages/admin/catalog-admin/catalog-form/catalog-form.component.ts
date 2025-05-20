import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CatalogItem } from '../../../../core/models/catalog.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalog-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './catalog-form.component.html',
  styleUrls: ['./catalog-form.component.scss']
})
export class CatalogFormComponent implements OnChanges {
  @Input() catalog: CatalogItem | null = null;
  @Input() isViewMode: boolean = false;

  @Output() save = new EventEmitter<CatalogItem>();
  @Output() close = new EventEmitter<void>();

  catalogForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.catalogForm = this.fb.group({
      id: [0],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', Validators.maxLength(500)],
      image: ['', [Validators.required, Validators.pattern(/https?:\/\/.+\.(jpeg|jpg|png|gif)/i)]],
      fabric: ['', Validators.maxLength(100)]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['catalog']) {
      if (this.catalog) {
        this.catalogForm.patchValue(this.catalog);
      } else {
        this.catalogForm.reset({
          id: 0,
          name: '',
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

  onSubmit(): void {
    if (this.catalogForm.valid) {
      this.save.emit(this.catalogForm.value);
    } else {
      // Opcional: marcar todos los controles como tocados para mostrar errores
      this.catalogForm.markAllAsTouched();
    }
  }

  onClose(): void {
    this.close.emit();
  }
}
