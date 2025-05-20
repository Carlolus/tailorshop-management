import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewLogComponent } from './log-view/log-view.component';
import { AuditLogService } from '../../../core/services/logs/audit-log.service';
import { AuditLog } from '../../../core/models/audit-log.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-audit-log',
  standalone: true,
  imports: [FormsModule, ViewLogComponent, CommonModule],
  templateUrl: './audit-log.component.html',
  styleUrl: './audit-log.component.scss'
})
export class AuditLogComponent implements OnInit, OnDestroy {

  logs: AuditLog[] = [];
  isLoading = true;
  private destroy$ = new Subject<void>();
  showForm = false;
  selectedLog: AuditLog | null = null;
  searchTerm: string = '';

  constructor(
    private logService: AuditLogService
  ) { }

  ngOnInit(): void {
    this.loadLogs();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadLogs(): void {
    this.isLoading = true;
    this.logService.getAuditLog()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (logs) => {
          this.logs = logs;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading logs:', err);
          this.isLoading = false;
        }
      });
  }

  get filteredLogs() {
    if (!this.searchTerm.trim()) return this.logs;
    const term = this.searchTerm.toLowerCase();
    return this.logs.filter(f =>
      f.user_name.toLowerCase().includes(term) ||
      f.action.toLowerCase().includes(term) ||
      f.entity.toLowerCase().includes(term)
    );
  }

  openViewForm(log: AuditLog): void {
    this.selectedLog = log;
    this.showForm = true;
  }

  onFormClosed(): void {
    this.showForm = false;
  }

}
