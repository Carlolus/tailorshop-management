import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { FabricService } from '../../../../../../core/services/fabrics/fabric.service';
import { Fabric } from '../../../../../../core/models/fabric.model';
import { GarmentType } from '../../../../../../core/models/garment-type.model';
import { GarmentTypeService } from '../../../../../../core/services/garment-types/garment-types.service';
import { GarmentReferenceUploadService } from '../../../../../../core/services/uploads/garment-reference-upload.service';

export interface Garment {
    garment_id?: number;
    order_id?: number;
    garment_type_id: number;
    fabric_id: number;
    quantity: number;
    person_name: string;
    details?: string;
    img?: string;
    measures: string;
}

@Component({
    selector: 'app-step3-garments',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    templateUrl: './step3-garments.component.html',
    styleUrls: ['./step3-garments.component.scss']
})
export class Step3GarmentsComponent implements OnInit {
    @Output() garmentsDataValid = new EventEmitter<Garment[] | null>();

    garmentsForm: FormGroup;
    fabrics: Fabric[] = [];
    garmentTypes: GarmentType[] = [];

    constructor(
        private fb: FormBuilder,
        private fabricService: FabricService,
        private garmentTypeService: GarmentTypeService,
        private garmentReferenceUploadService : GarmentReferenceUploadService
    ) {
        this.garmentsForm = this.fb.group({
            garments: this.fb.array([])
        });

        this.garmentsForm.valueChanges.subscribe(() => {
            this.emitGarmentsData();
        });
    }

    ngOnInit() {
        this.loadFabrics();
        this.addGarment();
        this.loadGarmentTypes();
    }

    get garmentsArray(): FormArray {
        return this.garmentsForm.get('garments') as FormArray;
    }

    loadFabrics() {
        this.fabricService.getFabrics().subscribe({
            next: (fabrics) => {
                this.fabrics = fabrics;
            },
            error: (error) => {
                console.error('Error loading fabrics:', error);
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
            }
        });
    }

    createGarmentFormGroup(): FormGroup {
        return this.fb.group({
            garment_type_id: ['', Validators.required],
            fabric_id: ['', Validators.required],
            quantity: [1, [Validators.required, Validators.min(1)]],
            person_name: [''],
            details: [''],
            img: [''],
            measures: ['', Validators.required]
        });
    }

    addGarment() {
        const newGarment = this.createGarmentFormGroup();
        newGarment.valueChanges.subscribe(() => {
            this.emitGarmentsData();
        });
        this.garmentsArray.push(newGarment);
        this.emitGarmentsData();
    }

    removeGarment(index: number) {
        if (this.garmentsArray.length > 1) {
            this.garmentsArray.removeAt(index);
            this.emitGarmentsData();
        }
    }

    onImageSelected(event: any, index: number) {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('image', file);
            this.garmentReferenceUploadService.uploadImage(formData).subscribe({
                next: (res) => {
                    this.garmentsArray.at(index).get('img')?.setValue(res.url);
                },
                error: (err) => {
                    console.error('Error subiendo imagen:', err);
                }
            });
        }
    }

    getGarmentTypeName(typeId: number): string {
        if (typeId && typeId >= 1 && typeId <= this.garmentTypes.length) {
            return this.garmentTypes[typeId - 1].name;
        }
        return 'Tipo no seleccionado';
    }

    getFabricName(fabricId: number): string {
        const fabric = this.fabrics.find(f => f.fabric_id == fabricId);
        return fabric ? `${fabric.fabric_name}` : 'Tela no seleccionada';
    }

    private emitGarmentsData() {
        if (this.garmentsForm.valid && this.garmentsArray.length > 0) {
            const formValue = this.garmentsForm.value;
            const garments: Garment[] = [];

            formValue.garments.forEach((garmentData: any) => {
                const garment: Garment = {

                    order_id: 0,   // Placeholder, adjust if needed for actual ID
                    garment_type_id: parseInt(garmentData.garment_type_id),
                    fabric_id: parseInt(garmentData.fabric_id),
                    quantity: garmentData.quantity,
                    person_name: garmentData.person_name || undefined,
                    details: garmentData.details || '',
                    img: garmentData.img || undefined,
                    measures: garmentData.measures // Assigning measures directly
                };
                garments.push(garment);
            });

            this.garmentsDataValid.emit(garments); // Emit the array of Garment objects
        } else {
            this.garmentsDataValid.emit(null); // Emit null if the form is invalid or empty
        }
    }

    // Marks all form controls as touched to display validation errors
    markAllAsTouched() {
        this.garmentsArray.controls.forEach(control => {
            // Mark all direct controls within each garment's FormGroup as touched
            Object.keys(control.value).forEach(key => {
                control.get(key)?.markAsTouched();
            });
        });
    }

    // Checks if the overall garments form is valid
    isFormValid(): boolean {
        return this.garmentsForm.valid && this.garmentsArray.length > 0;
    }

    getGarmentsData(): Garment[] | null {
        if (!this.isFormValid()) {
            return null;
        }

        const formValue = this.garmentsForm.value;
        const garments: Garment[] = [];

        formValue.garments.forEach((garmentData: any) => {
            const garment: Garment = {
                garment_id: 0,
                order_id: 0,
                garment_type_id: parseInt(garmentData.garment_type_id),
                fabric_id: parseInt(garmentData.fabric_id),
                quantity: garmentData.quantity,
                person_name: garmentData.person_name,
                details: garmentData.details || '',
                img: garmentData.img || undefined,
                measures: garmentData.measures // Assigning measures directly
            };
            garments.push(garment);
        });
        return garments; // Return the array of Garment objects
    }
}