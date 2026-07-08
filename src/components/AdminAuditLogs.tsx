import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Filter, Download, ChevronDown, ChevronRight, Activity, AlertTriangle, Info, ShieldAlert
} from "lucide-react";

export function AdminAuditLogsModule() {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  
  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="attendance-module-wrapper" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      
      {/* HEADER */}
      <div className="workspace-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
           <h2 className="module-title" style={{ margin: 0 }}>Unified Audit Logs</h2>
           <p style={{ color: 'var(--muted)', marginTop: '8px' }}>Monitor all system events, authentication attempts, and data modifications.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="outline-btn"><Download size={16} /> Export CSV</button>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, gap: '24px', minHeight: 0 }}>
        
        {/* LEFT SIDEBAR: FILTER ENGINE */}
        <div className="glass-card" style={{ width: '300px', padding: '24px', borderRadius: '24px', flexShrink: 0, overflowY: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', color: 'var(--text)', fontWeight: 600 }}>
            <Filter size={18} /> Log Filters
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <label className="portal-search" style={{ width: '100%' }}>
              <Search size={16} />
              <input placeholder="Search user, IP, or event..." />
            </label>

            <label className="form-group">
              <span style={{ fontSize: '0.85rem' }}>Time Range</span>
              <select className="portal-input" defaultValue="Last 24 Hours">
                <option>Last 1 Hour</option>
                <option>Last 24 Hours</option>
                <option>Last 7 Days</option>
                <option>Custom Range...</option>
              </select>
            </label>

            <div style={{ padding: '16px', background: 'var(--bg-soft)', borderRadius: '12px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '12px' }}>Severity Level</span>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '0.85rem' }}>
                <input type="checkbox" defaultChecked /> 
                <span style={{ color: 'var(--blue)' }}><Info size={14} style={{ display: 'inline', verticalAlign: 'text-bottom' }}/> Info</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '0.85rem' }}>
                <input type="checkbox" defaultChecked /> 
                <span style={{ color: 'var(--amber)' }}><AlertTriangle size={14} style={{ display: 'inline', verticalAlign: 'text-bottom' }}/> Warning</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                <input type="checkbox" defaultChecked /> 
                <span style={{ color: 'var(--rose)' }}><ShieldAlert size={14} style={{ display: 'inline', verticalAlign: 'text-bottom' }}/> Critical</span>
              </label>
            </div>

            <label className="form-group">
              <span style={{ fontSize: '0.85rem' }}>Event Category</span>
              <select className="portal-input" defaultValue="All Categories">
                <option>All Categories</option>
                <option>Authentication</option>
                <option>Data Modification</option>
                <option>Security</option>
                <option>System</option>
              </select>
            </label>

            <button className="gradient-btn" style={{ width: '100%', marginTop: '8px' }}>Apply Filters</button>
          </div>
        </div>

        {/* MAIN CONTENT: LOG VIEWER */}
        <div className="glass-card" style={{ flex: 1, padding: '24px', borderRadius: '24px', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Event Stream</h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--emerald)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--emerald)' }}></div> Live Streaming
            </span>
          </div>

          <div className="portal-table-wrapper" style={{ margin: 0, flex: 1, overflowY: 'auto' }}>
            <table className="portal-table" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ width: '30px' }}></th>
                  <th style={{ width: '180px' }}>Timestamp</th>
                  <th style={{ width: '200px' }}>Event Type</th>
                  <th style={{ width: '150px' }}>User / IP</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map((log) => (
                  <React.Fragment key={log.id}>
                    <tr 
                      onClick={() => toggleRow(log.id)}
                      style={{ 
                        cursor: 'pointer', 
                        background: expandedRow === log.id ? 'var(--bg-soft)' : 'transparent',
                        borderBottom: '1px solid var(--line)',
                        transition: 'background 0.2s'
                      }}
                    >
                      <td style={{ padding: '12px 16px', color: 'var(--muted)' }}>
                        {expandedRow === log.id ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      </td>
                      <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                        {log.timestamp}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {log.severity === 'Info' && <Info size={14} color="var(--blue)" />}
                          {log.severity === 'Warning' && <AlertTriangle size={14} color="var(--amber)" />}
                          {log.severity === 'Critical' && <ShieldAlert size={14} color="var(--rose)" />}
                          <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text)' }}>{log.event}</span>
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{log.user}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--muted)', fontFamily: 'monospace' }}>{log.ip}</div>
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        {log.description}
                      </td>
                    </tr>
                    
                    {expandedRow === log.id && (
                      <tr>
                        <td colSpan={5} style={{ padding: 0 }}>
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }} 
                            animate={{ height: 'auto', opacity: 1 }} 
                            exit={{ height: 0, opacity: 0 }}
                            style={{ overflow: 'hidden' }}
                          >
                            <div style={{ padding: '24px', background: '#1E1E1E', margin: '0', color: '#D4D4D4', fontFamily: 'monospace', fontSize: '0.85rem', whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
                              {JSON.stringify(log.payload, null, 2)}
                            </div>
                          </motion.div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Showing 1 to {auditLogs.length} of 42,910 events</span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="outline-btn" style={{ padding: '6px 12px' }}>Previous</button>
              <button className="gradient-btn" style={{ padding: '6px 12px' }}>Next</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// MOCK DATA
// -------------------------------------------------------------

const auditLogs = [
  {
    id: "LOG-001",
    timestamp: "2026-07-08 14:32:05 UTC",
    severity: "Info",
    event: "AUTH_SUCCESS",
    user: "dr.kavya@xebia.com",
    ip: "192.168.1.104",
    description: "Successful login via SSO.",
    payload: {
      "eventId": "e9b2-4d1a",
      "action": "login",
      "provider": "okta",
      "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      "geo": { "city": "Bangalore", "country": "IN" }
    }
  },
  {
    id: "LOG-002",
    timestamp: "2026-07-08 14:30:12 UTC",
    severity: "Warning",
    event: "DATA_EXPORT",
    user: "admin.ops@xebia.com",
    ip: "10.0.0.52",
    description: "Exported Finance_Report_Q2.csv",
    payload: {
      "eventId": "f7c9-2a9b",
      "module": "Finance",
      "filters": { "range": "Q2", "type": "Trainer Payouts" },
      "rowsExported": 420,
      "riskScore": "Medium"
    }
  },
  {
    id: "LOG-003",
    timestamp: "2026-07-08 14:28:45 UTC",
    severity: "Critical",
    event: "ROLE_MODIFIED",
    user: "sysadmin@xebia.com",
    ip: "192.168.1.1",
    description: "Changed privileges for rajesh.kumar@xebia.com",
    payload: {
      "eventId": "a1b2-c3d4",
      "targetUser": "rajesh.kumar@xebia.com",
      "previousRole": "Learner",
      "newRole": "Admin",
      "reason": "Escalation Ticket #8812",
      "authorization": "Verified"
    }
  },
  {
    id: "LOG-004",
    timestamp: "2026-07-08 14:25:10 UTC",
    severity: "Info",
    event: "COURSE_CREATED",
    user: "dr.kavya@xebia.com",
    ip: "192.168.1.104",
    description: "Created new course 'Advanced React Patterns'",
    payload: {
      "eventId": "b3f4-1d2a",
      "courseId": "CR-8921",
      "title": "Advanced React Patterns",
      "status": "Draft",
      "assignedTo": ["dr.kavya@xebia.com"]
    }
  },
  {
    id: "LOG-005",
    timestamp: "2026-07-08 14:15:22 UTC",
    severity: "Warning",
    event: "AUTH_FAILED",
    user: "unknown (sneha@design.co)",
    ip: "45.22.19.102",
    description: "Failed login attempt (Invalid Password).",
    payload: {
      "eventId": "c8e1-9f2b",
      "action": "login",
      "reason": "InvalidCredentials",
      "attemptsCount": 3,
      "geo": { "city": "Mumbai", "country": "IN" }
    }
  },
  {
    id: "LOG-006",
    timestamp: "2026-07-08 14:10:05 UTC",
    severity: "Info",
    event: "FEE_COLLECTED",
    user: "system_billing",
    ip: "127.0.0.1",
    description: "Processed payment for TXN-90992.",
    payload: {
      "eventId": "d4a5-7b6c",
      "transactionId": "TXN-90992",
      "amount": 45000,
      "currency": "INR",
      "method": "UPI",
      "status": "Success"
    }
  },
  {
    id: "LOG-007",
    timestamp: "2026-07-08 14:05:11 UTC",
    severity: "Critical",
    event: "SYSTEM_ALERT",
    user: "system_monitor",
    ip: "127.0.0.1",
    description: "Database latency spiked above 500ms.",
    payload: {
      "eventId": "e5c6-8a9d",
      "component": "PostgreSQL_Primary",
      "metric": "QueryLatency",
      "value": "512ms",
      "threshold": "500ms",
      "status": "Resolved"
    }
  }
];
