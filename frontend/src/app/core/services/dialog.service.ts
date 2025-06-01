import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog.component';
import { AlertDialogComponent } from '../../dialogs/alert-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  confirm(title: string, message: string): Promise<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { title, message }
    });

    return dialogRef.afterClosed().toPromise();
  }


  notify(title: string, message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info'): void {
    this.dialog.open(AlertDialogComponent, {
      width: '400px',
      data: { title, message, type }
    });
  }

  openDialog<T>(component: any, config?: any): Observable<T> {
    const dialogRef = this.dialog.open(component, config);
    return dialogRef.afterClosed();
  }

  openSnackBar(message: string, action: string = 'Cerrar', duration: number = 3000, panelClass: string[] = []): void {
    this.snackBar.open(message, action, {
      duration: duration,
      panelClass: panelClass, // Esto permite aplicar estilos personalizados
      horizontalPosition: 'end', // Posición horizontal: 'start' | 'center' | 'end' | 'left' | 'right'
      verticalPosition: 'top' // Posición vertical: 'top' | 'bottom'
    });
  }

  // Puedes añadir otros métodos para tipos específicos de mensajes si quieres
  openSuccessSnackBar(message: string, action: string = 'Cerrar', duration: number = 3000): void {
    this.openSnackBar(message, action, duration, ['success-snackbar']);
  }

  openErrorSnackBar(message: string, action: string = 'Cerrar', duration: number = 5000): void {
    this.openSnackBar(message, action, duration, ['error-snackbar']);
  }

  openWarningSnackBar(message: string, action: string = 'Cerrar', duration: number = 4000): void {
    this.openSnackBar(message, action, duration, ['warning-snackbar']);
  }
}