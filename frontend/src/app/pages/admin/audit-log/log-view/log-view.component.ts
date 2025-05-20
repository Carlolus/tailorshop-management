import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuditLog } from '../../../../core/models/audit-log.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-log-view-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './log-view.component.html',
  styleUrls: ['./log-view.component.scss']
})
export class ViewLogComponent {
  @Input() logData: AuditLog | null = null;
  @Output() formClosed = new EventEmitter<void>();
  @Output() formSubmitted = new EventEmitter<AuditLog>();
  @Input() isViewMode: boolean = false;


  constructor() {

  }

  getChangeKeys(): string[] {
    return this.logData?.changes ? Object.keys(this.logData.changes) : [];
  }

  closeForm(): void {
    this.formClosed.emit();
  }
}