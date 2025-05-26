import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

// Angular Material
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-order-creation',
  standalone: true,
  templateUrl: './order-creation.component.html',
  styleUrls: ['./order-creation.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // Material Modules
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class OrderCreationComponent {
  clienteForm: FormGroup;
  ordenForm: FormGroup;
  prendasForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.clienteForm = this.fb.group({});
    this.ordenForm = this.fb.group({});
    this.prendasForm = this.fb.group({});
  }

  confirmarOrden() {
    // lógica al confirmar orden
  }
}
