import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Step1CustomerComponent } from './steps/step1-customer/step1-customer.component';
import { Customer } from '../../../core/models/customer.model';

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
    Step1CustomerComponent
  ]
})
export class OrderCreationComponent {
  clienteForm: FormGroup;
  ordenForm: FormGroup;
  prendasForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    // Form para el paso de cliente - se maneja la validación manualmente
    this.clienteForm = this.fb.group({
      clienteValido: [false, Validators.requiredTrue]
    });
    
    this.ordenForm = this.fb.group({
      // Aquí agregarás los campos del formulario de orden
      fechaEntrega: ['', Validators.required],
      observaciones: ['']
    });
    
    this.prendasForm = this.fb.group({
      // Aquí agregarás los campos del formulario de prendas
      cantidadPrendas: [1, [Validators.required, Validators.min(1)]]
    });
  }

  // Variables para manejar el estado del cliente
  clienteExistenteId: number | null = null;
  clienteNuevo: Customer | null = null;
  pasoClienteValido = false;

  procesarCliente(event: { tipo: 'nuevo'; data: Customer } | { tipo: 'existente'; id: number } | null) {
    if (!event) {
      this.clienteExistenteId = null;
      this.clienteNuevo = null;
      this.pasoClienteValido = false;
      // Actualizar el FormControl para que el stepper sepa que no es válido
      this.clienteForm.patchValue({ clienteValido: false });
      return;
    }

    if (event.tipo === 'nuevo') {
      this.clienteNuevo = event.data;
      this.clienteExistenteId = null;
      this.pasoClienteValido = true;
      console.log('Nuevo cliente preparado:', this.clienteNuevo);
    } else {
      this.clienteExistenteId = event.id;
      this.clienteNuevo = null;
      this.pasoClienteValido = true;
      console.log('Cliente existente seleccionado ID:', this.clienteExistenteId);
    }

    // Actualizar el FormControl para que el stepper sepa que es válido
    this.clienteForm.patchValue({ clienteValido: true });
  }

  confirmarOrden() {
    console.log('=== CONFIRMANDO ORDEN ===');
    
    // Validar que hay un cliente válido
    if (!this.pasoClienteValido) {
      console.warn('No hay cliente válido');
      return;
    }

    // Procesar según el tipo de cliente
    if (this.clienteExistenteId) {
      console.log('Orden con cliente existente:', this.clienteExistenteId);
      // Aquí harías la llamada al servicio para crear la orden con cliente existente
    } else if (this.clienteNuevo) {
      console.log('Orden con nuevo cliente:', this.clienteNuevo);
      // Aquí harías la llamada al servicio para crear primero el cliente y luego la orden
    }

    // Datos de la orden
    console.log('Datos de la orden:', this.ordenForm.value);
    console.log('Datos de las prendas:', this.prendasForm.value);
    
    // Aquí implementarías la lógica para enviar los datos al backend
  }

  // Método para obtener el cliente seleccionado (útil para mostrar en el resumen)
  getClienteInfo(): string {
    if (this.clienteNuevo) {
      return `${this.clienteNuevo.name} - ${this.clienteNuevo.phone} (Nuevo cliente)`;
    } else if (this.clienteExistenteId) {
      return `Cliente ID: ${this.clienteExistenteId} (Cliente existente)`;
    }
    return 'No hay cliente seleccionado';
  }
}