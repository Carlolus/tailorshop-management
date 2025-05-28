import { Component, inject } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-success-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>¡Orden creada!</h2>
    <mat-dialog-content>La orden fue registrada exitosamente.</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button color="primary" (click)="close()">Aceptar</button>
    </mat-dialog-actions>
  `
})
export class SuccessDialogComponent {
  private dialogRef = inject(MatDialogRef<SuccessDialogComponent>);
  close() {
    this.dialogRef.close();
  }
}
