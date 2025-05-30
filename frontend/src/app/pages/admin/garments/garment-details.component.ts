import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';

// Models
import { Garment } from '../../../core/models/garment.model';
import { Customer } from '../../../core/models/customer.model';
import { Fabric } from '../../../core/models/fabric.model';
import { GarmentType } from '../../../core/models/garment-type.model';
import { Order } from '../../../core/models/order.model';

// Services
import { GarmentService } from '../../../core/services/garment/garment.service';
import { CustomerService } from '../../../core/services/customers/customers.service';
import { FabricService } from '../../../core/services/fabrics/fabric.service';
import { GarmentTypeService } from '../../../core/services/garment-types/garment-types.service';
import { OrderService } from '../../../core/services/orders/order.service';
import { firstValueFrom } from 'rxjs';





export interface Garment2 {
    garment_id: number;
    order_id: number;
    garment_type_id: number;
    fabric_id: number;
    quantity: number;
    person_name?: string;
    details: string;
    img?: string;
    measures: string;
    customer_name: string;
    fabric_description: string;

    // Propiedades adicionales que podrían venir del backend
    garment_type_name?: string;
    fabric_name?: string;
    fabric_img?: string;
}

@Component({
    selector: 'app-garment-details',
    templateUrl: './garment-details.component.html',
    styleUrls: ['./garment-details.component.scss'],
    imports: [
        CommonModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatChipsModule,
        MatMenuModule
    ]
})
export class GarmentDetailsComponent implements OnInit {

    @Input() garmentId?: number;

    order!: Order;
    garment!: Garment;
    fabric!: Fabric;
    garmentType!: GarmentType;
    customer!: Customer;
    garmentData!: Garment2;
    isLoading = true;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        private garmentService: GarmentService,
        private garmentTypeService: GarmentTypeService,
        private customerService: CustomerService,
        private fabricService: FabricService,
        private orderService: OrderService
    ) { }

    ngOnInit(): void {
        this.loadGarmentDetails();
    }

    private async loadGarmentDetails(): Promise<void> {
        const id = this.garmentId || +this.route.snapshot.paramMap.get('id')!;

        this.garment = await firstValueFrom(this.garmentService.getGarmentById(id));
        if (this.garment) {
            this.fabric = await firstValueFrom(this.fabricService.getFabricById(this.garment.fabric_id));
            this.order = await firstValueFrom(this.orderService.getOrderById(this.garment.order_id));
            this.customer = await firstValueFrom(this.customerService.getCustomerById(this.order.customer_id));
            this.fabric = await firstValueFrom(this.fabricService.getFabricById(this.garment.fabric_id));
            this.garmentType = await firstValueFrom(this.garmentTypeService.getGarmentTypeById(this.garment.garment_type_id));
        }
        if (!id) {
            console.error('No se proporcionó ID de prenda');
            this.onBack();
            return;
        }

        this.isLoading = true;

        console.log(this.garment.img)

        setTimeout(() => {
            this.garmentData = {
                garment_id: id,
                order_id: this.garment.order_id,
                garment_type_id: this.garment.garment_type_id,
                fabric_id: this.garment.fabric_id,
                quantity: this.garment.quantity,
                person_name: this.garment.person_name ?? this.customer.name,
                customer_name: this.customer.name,
                details: this.garment.details,
                img: this.garment.img,
                measures: this.garment.measures,
                garment_type_name: this.garmentType.name,
                fabric_name: this.fabric.fabric_name,
                fabric_img: this.fabric.image,
                fabric_description: this.fabric.description
            };
            this.isLoading = false;
        }, 1000);
    }

    onBack(): void {
        this.location.back();
    }

    onEdit(): void {
        if (this.garmentData) {
            // Navegar a la página de edición de la prenda
            this.router.navigate(['/garments', this.garmentData.garment_id, 'edit']);
        }
    }

    onPrint(): void {
        // Implementar funcionalidad de impresión
        window.print();
    }

    onImageError(event: any): void {
        // Manejar error de carga de imagen
        event.target.style.display = 'none';
        console.warn('Error al cargar la imagen de la prenda');
    }
}