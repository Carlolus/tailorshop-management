import { Component, OnInit, OnDestroy } from '@angular/core';
import { Fabric } from '../../../core/models/fabric.model';
import { FabricService } from '../../../core/services/fabrics/fabric.service';
import { Subject, takeUntil } from 'rxjs';
import { FabricFormComponent } from './fabric-form/fabric-form.component';
import { DialogService } from '../../../core/services/dialog.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-fabrics-admin',
    standalone: true,
    imports: [
        FabricFormComponent,
        FormsModule // ✅ Agrégalo aquí
    ],
    templateUrl: './fabrics-admin.component.html',
    styleUrls: ['./fabrics-admin.component.scss']
})
export class FabricsAdminComponent implements OnInit, OnDestroy {
    fabrics: Fabric[] = [];
    isLoading = true;
    private destroy$ = new Subject<void>();
    showForm = false;
    selectedFabric: Fabric | null = null;
    searchTerm: string = '';

    constructor(
        private fabricService: FabricService,
        private dialogService: DialogService
    ) { }

    ngOnInit(): void {
        this.loadFabrics();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    loadFabrics(): void {
        this.isLoading = true;
        this.fabricService.getFabrics()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (fabrics) => {
                    this.fabrics = fabrics;
                    this.isLoading = false;
                },
                error: (err) => {
                    console.error('Error loading fabrics:', err);
                    this.isLoading = false;
                }
            });
    }

    get filteredFabrics() {
        if (!this.searchTerm.trim()) return this.fabrics;
        const term = this.searchTerm.toLowerCase();
        return this.fabrics.filter(f =>
            f.fabric_name.toLowerCase().includes(term) ||
            f.description.toLowerCase().includes(term)
        );
    }

    confirmDelete(fabricId: number): void {
        this.dialogService.confirm(
            'Eliminar tela',
            '¿Estás seguro de que deseas eliminar esta tela?'
        ).then(confirmed => {
            if (confirmed) this.deleteFabric(fabricId);
        });
    }

    private deleteFabric(fabricId: number): void {
        this.fabricService.deleteFabric(fabricId)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: () => {
                    this.loadFabrics();
                    this.dialogService.notify('Tela eliminada correctamente', '', "success");
                },
                error: (err) => {
                    console.error('Error deleting fabric:', err);
                    this.dialogService.notify('Error al eliminar la tela', 'error');
                }
            });
    }

    openCreateForm(): void {
        this.selectedFabric = null;
        this.showForm = true;
    }

    openEditForm(fabric: Fabric): void {
        this.selectedFabric = fabric;
        this.showForm = true;
    }

    onFormClosed(): void {
        this.showForm = false;
    }

    saveFabric(fabric: Fabric): void {
        const operation = fabric.fabric_id
            ? this.fabricService.updateFabric(fabric)
            : this.fabricService.createFabric(fabric);

        operation.pipe(takeUntil(this.destroy$))
            .subscribe({
                next: () => {
                    this.loadFabrics();
                    this.showForm = false;
                    this.dialogService.notify(
                        (`Tela ${fabric.fabric_id ? 'actualizada' : 'creada'} correctamente`),
                        "success"
                    );
                },
                error: (err) => {
                    console.error('Error saving fabric:', err);
                    this.dialogService.notify('Error al guardar la tela', 'error');
                }
            });
    }
}