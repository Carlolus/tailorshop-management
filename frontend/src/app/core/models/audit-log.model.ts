export interface AuditLog {
    audit_log_id: string;
    user_id: string | null;
    user_name: string;
    action: 'create' | 'update' | 'delete';
    entity: string;
    entity_id: string;
    changes: Record<string, [string, string]> | null;
    description: string;
    timestamp: string;
}