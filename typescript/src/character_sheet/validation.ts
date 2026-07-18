export interface ValidationIssue {
  severity: 'error' | 'warning';
  message: string;
  field?: string;
}
