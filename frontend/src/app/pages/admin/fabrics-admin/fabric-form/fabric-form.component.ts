import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Fabric } from '../../../../core/models/fabric.model';

@Component({
  selector: 'app-fabric-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './fabric-form.component.html',
  styleUrls: ['./fabric-form.component.scss']
})
export class FabricFormComponent {
  @Input() fabricData: Fabric | null = null;
  @Output() formClosed = new EventEmitter<void>();
  @Output() formSubmitted = new EventEmitter<Fabric>();

  fabricForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.fabricForm = this.fb.group({
      fabric_id: [null],
      fabric_name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', Validators.maxLength(500)],
      image: ['', [Validators.required, Validators.pattern(/https?:\/\/.+\.(jpeg|jpg|png|gif)/i)]]
    });
  }

  ngOnChanges(): void {
    if (this.fabricData) {
      this.fabricForm.patchValue(this.fabricData);
    }
  }

  onSubmit(): void {
    if (this.fabricForm.valid) {
      this.formSubmitted.emit(this.fabricForm.value);
    }
  }

  closeForm(): void {
    this.formClosed.emit();
  }
}