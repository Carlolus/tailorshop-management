import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FabricService } from '../../../../core/services/fabrics/fabric.service';
import { Fabric } from '../../../../core/models/fabric.model';
import { GarmentType } from '../../../../core/models/garment-type.model';
import { GarmentTypeService } from '../../../../core/services/garment-types/garment-types.service';
import { GarmentReferenceUploadService } from '../../../../core/services/uploads/garment-reference-upload.service';
import { Garment } from '../../../../core/models/garment.model';
import { GarmentService } from '../../../../core/services/garment/garment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { DialogService } from '../../../../core/services/dialog.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-garment-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './garment-edit.component.html',
  styleUrls: ['./garment-edit.component.scss']
})
export class GarmentEditComponent implements OnInit {
  garmentData!: Garment; // Ahora es obligatorio
  garment_id!: number;

  garmentForm: FormGroup;
  fabrics: Fabric[] = [];
  garmentTypes: GarmentType[] = [];
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private fabricService: FabricService,
    private garmentTypeService: GarmentTypeService,
    private garmentReferenceUploadService: GarmentReferenceUploadService,
    private garmentService: GarmentService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService
  ) {
    this.garmentForm = this.fb.group({
      garment_type_id: ['', Validators.required],
      fabric_id: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      person_name: [''],
      details: [''],
      img: [''],
      measures: ['', Validators.required]
    });
  }

  async ngOnInit() {
    this.garment_id = +(this.route.snapshot.paramMap.get('id') || '');
    console.log("Receipt ID: ", this.garment_id)
    this.loadFabrics();
    this.loadGarmentTypes();
    this.garmentData = await firstValueFrom(this.garmentService.getGarmentById(this.garment_id));
    this.loadGarmentData(this.garmentData);
  }

  loadGarmentData(garment: Garment) {
    this.garmentForm.patchValue({
      garment_type_id: garment.garment_type_id,
      fabric_id: garment.fabric_id,
      quantity: garment.quantity,
      person_name: garment.person_name || '',
      details: garment.details || '',
      img: garment.img || '',
      measures: garment.measures
    });

  }

  loadFabrics() {
    this.fabricService.getFabrics().subscribe({
      next: (fabrics) => {
        this.fabrics = fabrics;
      },
      error: (error) => {
        console.error('Error loading fabrics:', error);
        this.errorMessage = 'Error al cargar las telas disponibles';
      }
    });
  }

  loadGarmentTypes() {
    this.garmentTypeService.getGarmentTypes().subscribe({
      next: (garmentTypes) => {
        this.garmentTypes = garmentTypes;
      },
      error: (error) => {
        console.error('Error loading garment types:', error);
        this.errorMessage = 'Error al cargar los tipos de prenda';
      }
    });
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.isLoading = true;
      const formData = new FormData();
      formData.append('image', file);
      
      this.garmentReferenceUploadService.uploadImage(formData).subscribe({
        next: (res) => {
          this.garmentForm.get('img')?.setValue(res.url);
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error subiendo imagen:', err);
          this.errorMessage = 'Error al subir la imagen';
          this.isLoading = false;
        }
      });
    }
  }

  removeImage() {
    this.garmentForm.get('img')?.setValue('');
  }

  confirmUpdate(): void {
    this.dialogService.confirm(
      'Actualizar preda',
      '¿Está seguro de actualizar información?'
    ).then(confirmed => {
      if (confirmed) this.save();
    });
  }

  save() {
    if (this.garmentForm.valid) {
      this.isLoading = true;
      this.errorMessage = null;
      
      const formValue = this.garmentForm.value;
      const updatedGarment: Garment = {
        ...this.garmentData,
        garment_type_id: parseInt(formValue.garment_type_id),
        fabric_id: parseInt(formValue.fabric_id),
        quantity: formValue.quantity,
        person_name: formValue.person_name || null,
        details: formValue.details || null,
        img: formValue.img || null,
        measures: formValue.measures
      };

      this.garmentService.updateGarment(updatedGarment).subscribe({
        next: () => {
          this.isLoading = false;
          // Redirigir o mostrar mensaje de éxito
          this.router.navigate(['/admin/orders', this.garmentData.order_id]);
        },
        error: (error) => {
          console.error('Error updating garment:', error);
          this.errorMessage = 'Error al guardar los cambios';
          this.isLoading = false;
        }
      });
    } else {
      this.markAllAsTouched();
      this.errorMessage = 'Por favor completa todos los campos requeridos';
    }
  }

  onCancel() {
    // Redirigir a la vista anterior
    this.router.navigate(['/admin/orders', this.garmentData.order_id]);
  }

  markAllAsTouched() {
    Object.keys(this.garmentForm.controls).forEach(key => {
      this.garmentForm.get(key)?.markAsTouched();
    });
  }
}