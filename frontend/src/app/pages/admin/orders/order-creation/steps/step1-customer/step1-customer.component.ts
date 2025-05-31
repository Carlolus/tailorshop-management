import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Customer } from '../../../../../../core/models/customer.model';
import { CustomerService } from '../../../../../../core/services/customers/customers.service';

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

    constructor(private customerService: CustomerService) { }
    @Output() clienteValido = new EventEmitter<ClienteValido | null>();

    mode: 'new' | 'select' = 'new';

    newClient: Partial<Customer> = {
        name: '',
        phone: '',
        address: '',
        mail: ''
    };

    selectedClientId: number | null = null;

    clients: Customer[] = [];


    clienteInput: string | Customer = '';
    clientesFiltrados = this.clients;

    loadCustomers(): void {
        this.customerService.getCustomers().subscribe({
            next: (customers: Customer[]) => {
                this.clients = customers;
                this.clientesFiltrados = customers; 
            },
            error: (error) => {
                console.error('Error fetching customers:', error);
            }
        });
    }


    ngOnInit() {
        this.loadCustomers();
        this.validateAndEmit();
    }

    onModeChange() {
        this.resetData();
        this.validateAndEmit();
    }

    private resetData() {
        if (this.mode === 'new') {
            this.selectedClientId = null;
            this.clienteInput = '';
            this.clientesFiltrados = this.clients;
        } else {
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
                    customer_id: 0,
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
            if (this.selectedClientId) {
                this.clienteValido.emit({ tipo: 'existente', id: this.selectedClientId });
            } else {
                this.clienteValido.emit(null);
            }
        }
    }

    displayClient(client: Customer): string {
        return client ? client.name : '';
    }

    get selectedClient(): Customer | null {
        return typeof this.clienteInput === 'object' && this.clienteInput ? this.clienteInput : null;
    }
}