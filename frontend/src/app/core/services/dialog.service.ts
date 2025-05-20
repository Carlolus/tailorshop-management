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
}