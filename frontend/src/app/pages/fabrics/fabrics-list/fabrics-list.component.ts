import { Component, OnInit, OnDestroy } from '@angular/core';
import { FabricService } from '../../../core/services/fabrics/fabric.service';
import { Fabric } from '../../../core/models/fabric.model';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-fabrics-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './fabrics-list.component.html',
  styleUrl: './fabrics-list.component.scss'
})
export class FabricsListComponent implements OnInit, OnDestroy {
  fabrics: Fabric[] = [];
  filteredFabrics: Fabric[] = [];
  searchControl = new FormControl('');
  private destroy$ = new Subject<void>();

  constructor(private fabricService: FabricService) {}

  ngOnInit(): void {
    this.loadFabrics();
    this.setupSearch();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadFabrics(): void {
    this.fabricService.getFabrics().subscribe({
      next: (fabrics: Fabric[]) => {
        this.fabrics = fabrics;
        this.filteredFabrics = [...fabrics];
      },
      error: (err) => console.error('Error loading fabrics:', err)
    });
  }

  private setupSearch(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(searchTerm => {
        this.filterFabrics(searchTerm || '');
      });
  }

  private filterFabrics(searchTerm: string): void {
    if (!searchTerm.trim()) {
      this.filteredFabrics = [...this.fabrics];
      return;
    }
    
    const term = searchTerm.toLowerCase();
    this.filteredFabrics = this.fabrics.filter(f => 
      f.fabric_name.toLowerCase().includes(term) ||
      f.description.toLowerCase().includes(term)
    );
  }
}