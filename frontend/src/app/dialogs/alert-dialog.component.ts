import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-alert-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="alert-header" [ngClass]="data.type">
      <mat-icon>
        {{ getIcon() }}
      </mat-icon>
      <h2 mat-dialog-title>{{ data.title }}</h2>
    </div>
    <mat-dialog-content>
      {{ data.message }}
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onClose()">Cerrar</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .alert-header {
      display: flex;
      align-items: center;
      padding: 16px 24px;
      gap: 12px;

      &.success {
        color: #2e7d32;
        background: #e8f5e9;
      }
      &.error {
        color: #c62828;
        background: #ffebee;
      }
      &.info {
        color: #1565c0;
        background: #e3f2fd;
      }
      &.warning {
        color: #f57f17;
        background: #fff8e1;
      }
    }
    mat-dialog-actions {
      padding: 16px 24px;
    }
  `]
})
export class AlertDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string; type: string }
  ) {}

  getIcon(): string {
    switch (this.data.type) {
      case 'success': return 'check_circle';
      case 'error': return 'error';
      case 'warning': return 'warning';
      default: return 'info';
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}