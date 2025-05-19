import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog.component';
import { AlertDialogComponent } from '../../dialogs/alert-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  /**
   * Show a confirmation dialog
   * @param title Dialog title
   * @param message Dialog message
   * @returns Promise that resolves to boolean (true if confirmed)
   */
  confirm(title: string, message: string): Promise<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { title, message }
    });

    return dialogRef.afterClosed().toPromise();
  }

  /**
   * Show a notification/alert dialog
   * @param title Dialog title
   * @param message Dialog message
   * @param type 'success' | 'error' | 'info' | 'warning'
   */
  notify(title: string, message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info'): void {
    this.dialog.open(AlertDialogComponent, {
      width: '400px',
      data: { title, message, type }
    });
  }

  /**
   * Show a custom dialog
   * @param component Component to show in dialog
   * @param config Dialog configuration
   * @returns Observable with dialog result
   */
  openDialog<T>(component: any, config?: any): Observable<T> {
    const dialogRef = this.dialog.open(component, config);
    return dialogRef.afterClosed();
  }
}