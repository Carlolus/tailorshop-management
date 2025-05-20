import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuditLog } from '../../models/audit-log.model';
import { HttpHeaderService } from '../httpHeader';

@Injectable({
  providedIn: 'root'
})
export class AuditLogService {
  private apiUrl = 'http://localhost:3000/log';

  constructor(
    private http: HttpClient,
    private httpHeaderService: HttpHeaderService
  ) {}

  getAuditLog(): Observable<AuditLog[]> {
    return this.http.get<AuditLog[]>(this.apiUrl, { headers: this.httpHeaderService.getHeaders() });
  }

  createAuditLog(log: Omit<AuditLog, 'audit_log_id'>): Observable<AuditLog> {
    return this.http.post<AuditLog>(this.apiUrl, log, { headers: this.httpHeaderService.getHeaders() });
  }

  updateAuditLog(log: AuditLog): Observable<AuditLog> {
    return this.http.put<AuditLog>(
      `${this.apiUrl}/${log.audit_log_id}`,
      log,
      { headers: this.httpHeaderService.getHeaders() }
    );
  }

  deleteAuditLog(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`,
      { headers: this.httpHeaderService.getHeaders() }
    );
  }
}
