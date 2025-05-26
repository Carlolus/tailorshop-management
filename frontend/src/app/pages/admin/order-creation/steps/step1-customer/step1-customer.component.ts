import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Customer } from '../../../../../core/models/customer.model';

type ClienteValido =
    | { tipo: 'nuevo'; data: Customer }
    | { tipo: 'existente'; id: number };

@Component({
    selector: 'app-step1-customer',
    standalone: true,
    templateUrl: './step1-customer.component.html',
    styleUrls: ['./step1-customer.component.scss'],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonToggleModule,
        MatAutocompleteModule
    ]
})
export class Step1CustomerComponent implements OnInit {
    @Output() clienteValido = new EventEmitter<ClienteValido | null>();

    mode: 'new' | 'select' = 'new';

    newClient: Partial<Customer> = {
        name: '',
        phone: '',
        address: '',
        mail: ''
    };

    selectedClientId: number | null = null;

    // Simulación de clientes existentes - en tu caso vendrían de un servicio
    clients: Customer[] = [
        { customer_id: 1, name: 'Juan Pérez', phone: '3210001111', address: 'Calle 123', mail: 'juan@email.com' },
        { customer_id: 2, name: 'Laura Gómez', phone: '3102223333', address: 'Carrera 45', mail: 'laura@email.com' },
        { customer_id: 3, name: 'Carlos Rodríguez', phone: '3156667777', address: 'Avenida 67', mail: 'carlos@email.com' }
    ];

    clienteInput: string | Customer = '';
    clientesFiltrados = this.clients;

    ngOnInit() {
        // Emitir estado inicial
        this.validateAndEmit();
    }

    onModeChange() {
        // Limpiar datos cuando cambie el modo
        this.resetData();
        this.validateAndEmit();
    }

    private resetData() {
        if (this.mode === 'new') {
            // Limpiar selección de cliente existente
            this.selectedClientId = null;
            this.clienteInput = '';
            this.clientesFiltrados = this.clients;
        } else {
            // Limpiar formulario de nuevo cliente
            this.newClient = {
                name: '',
                phone: '',
                address: '',
                mail: ''
            };
        }
    }

    filtrarClientes() {
        if (typeof this.clienteInput !== 'string') {
            this.clientesFiltrados = this.clients;
            return;
        }

        const filtro = this.clienteInput.toLowerCase();
        this.clientesFiltrados = this.clients.filter(client =>
            client.name.toLowerCase().includes(filtro) ||
            client.phone.toLowerCase().includes(filtro)
        );
    }

    seleccionarCliente(cliente: Customer) {
        this.selectedClientId = cliente.customer_id;
        this.clienteInput = cliente;
        console.log('Cliente seleccionado ID:', this.selectedClientId);
        this.clienteValido.emit({ tipo: 'existente', id: cliente.customer_id });
    }

    onClientInputChange() {
        // Si el input cambió y no es un objeto Customer, limpiar la selección
        if (typeof this.clienteInput === 'string') {
            this.selectedClientId = null;
            this.clienteValido.emit(null);
        }
        this.filtrarClientes();
    }

    onNewClientChange() {
        this.validateAndEmit();
    }

    private validateAndEmit() {
        if (this.mode === 'new') {
            const { name, phone } = this.newClient;
            if (name?.trim() && phone?.trim()) {
                const cliente: Customer = {
                    customer_id: 0, // Se asignará en el backend
                    name: name.trim(),
                    phone: phone.trim(),
                    address: this.newClient.address?.trim() || null,
                    mail: this.newClient.mail?.trim() || null
                };
                this.clienteValido.emit({ tipo: 'nuevo', data: cliente });
            } else {
                this.clienteValido.emit(null);
            }
        } else {
            // Modo seleccionar
            if (this.selectedClientId) {
                this.clienteValido.emit({ tipo: 'existente', id: this.selectedClientId });
            } else {
                this.clienteValido.emit(null);
            }
        }
    }

    // Método para mostrar el cliente en el autocomplete
    displayClient(client: Customer): string {
        return client ? client.name : '';
    }

    // Getter para obtener el cliente seleccionado de forma segura
    get selectedClient(): Customer | null {
        return typeof this.clienteInput === 'object' && this.clienteInput ? this.clienteInput : null;
    }
}