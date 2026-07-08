import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, UserPlus, CalendarCheck, Award, CreditCard, Library, LifeBuoy,
  ArrowRight, Search, Filter, Plus, Download, MoreVertical, X, Upload
} from "lucide-react";

type EntityType = "Student Profiles" | "Enrollment" | "Attendance" | "Certifications" | "Payments" | "Resource Library" | "Support Tickets";

export function AdminStudentsModule() {
  const [view, setView] = useState<"dashboard" | "manage" | "create-entity">("dashboard");
  const [activeEntity, setActiveEntity] = useState<EntityType>("Student Profiles");

  const handleManage = (entity: EntityType) => {
    setActiveEntity(entity);
    setView("manage");
  };

  const handleCreate = () => {
    setView("create-entity");
  };

  return (
    <div className="attendance-module-wrapper">
      <AnimatePresence mode="wait">
        {view === "dashboard" && (
          <motion.div key="dashboard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            <StudentsDashboard onManage={handleManage} />
          </motion.div>
        )}
        {view === "manage" && (
          <motion.div key="manage" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            <UnifiedEntityManager entity={activeEntity} onBack={() => setView("dashboard")} onStartCreate={handleCreate} />
          </motion.div>
        )}
        {view === "create-entity" && (
          <motion.div key="create-entity" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
            <EntityCreateDrawer entity={activeEntity} onCancel={() => setView("manage")} onSave={() => setView("manage")} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StudentsDashboard({ onManage }: { onManage: (e: EntityType) => void }) {
  return (
    <div className="portal-grid">
      <div className="workspace-header" style={{ gridColumn: 'span 4', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 0 }}>
        <div>
           <h2 className="module-title" style={{ margin: 0 }}>Learner Management</h2>
           <p style={{ color: 'var(--muted)', marginTop: '8px' }}>Manage learners, enrollments, certifications, and support requests.</p>
        </div>
      </div>

      <div style={{ gridColumn: 'span 4', display: 'flex', gap: '16px' }}>
        <MetricPill title={<>Total<br/>Learners</>} value="4.2K" text={<>Registered globally</>} icon={Users} iconColor="var(--purple)" />
        <MetricPill title={<>Active<br/>Enrollments</>} value="1.8K" text={<>Currently in courses</>} icon={UserPlus} iconColor="var(--emerald)" />
        <MetricPill title={<>Avg.<br/>Completion</>} value="84%" text={<>Course finish rate</>} icon={Award} iconColor="var(--purple)" />
        <MetricPill title={<>Active<br/>Subscriptions</>} value="2.1K" text={<>Paying learners</>} icon={CreditCard} iconColor="var(--emerald)" />
      </div>

      <div style={{ gridColumn: 'span 4', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px', marginTop: '8px' }}>
        <SummaryCard title="Student Profiles" count="4.2K" desc="Manage learner accounts and details" icon={Users} onClick={() => onManage("Student Profiles")} primary />
        <SummaryCard title="Enrollment" count="1.8K" desc="Cohort assignments and onboarding" icon={UserPlus} onClick={() => onManage("Enrollment")} />
        <SummaryCard title="Attendance" count="92%" desc="Live session attendance tracking" icon={CalendarCheck} onClick={() => onManage("Attendance")} />
        <SummaryCard title="Certifications" count="850" desc="Assessment scores and certificates" icon={Award} onClick={() => onManage("Certifications")} />
        <SummaryCard title="Payments" count="$45K" desc="Subscription plans and invoices" icon={CreditCard} onClick={() => onManage("Payments")} />
        <SummaryCard title="Resource Library" count="12K" desc="Access to premium materials" icon={Library} onClick={() => onManage("Resource Library")} />
        <SummaryCard title="Support Tickets" count="14" desc="Learner requests and feedback" icon={LifeBuoy} onClick={() => onManage("Support Tickets")} />
      </div>
    </div>
  );
}

function SummaryCard({ title, count, desc, icon: Icon, onClick, primary = false }: { title: string, count: string, desc: string, icon: React.ElementType, onClick?: () => void, primary?: boolean }) {
  return (
    <motion.article
      whileHover={{ y: -4, boxShadow: "0 12px 30px rgba(108, 29, 95, 0.08)" }}
      transition={{ duration: 0.2 }}
      className="glass-card"
      style={{ padding: '24px', borderRadius: '20px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}
    >
      {primary && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'var(--gradient-brand)' }} />}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: primary ? 'var(--gradient-brand)' : 'var(--bg-soft)', color: primary ? 'white' : 'var(--purple)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={24} strokeWidth={1.5} />
        </div>
        <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text)', lineHeight: 1 }}>{count}</span>
      </div>
      <h3 style={{ margin: '0 0 8px', fontSize: '1.2rem', color: 'var(--text)' }}>{title}</h3>
      <p style={{ margin: '0 0 24px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{desc}</p>
      
      <button className={primary ? "gradient-btn" : "outline-btn"} onClick={onClick} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Manage {title}</span>
        <ArrowRight size={16} />
      </button>
    </motion.article>
  );
}

// -------------------------------------------------------------
// UNIFIED ENTITY MANAGER
// -------------------------------------------------------------

function UnifiedEntityManager({ entity, onBack, onStartCreate }: { entity: EntityType, onBack: () => void, onStartCreate: () => void }) {
  const config = entityConfigs[entity];
  const data = mockData[entity];

  return (
    <div className="portal-grid">
      <div className="workspace-header" style={{ gridColumn: 'span 4', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 0 }}>
        <div>
           <button className="ghost-btn" onClick={onBack} style={{ padding: 0, marginBottom: '8px' }}><ArrowRight size={16} style={{ transform: 'rotate(180deg)', marginRight: '4px' }} /> Back to Dashboard</button>
           <h2 className="module-title" style={{ margin: 0 }}>{entity}</h2>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="outline-btn"><Download size={16} /> Export</button>
          <button className="gradient-btn" onClick={onStartCreate}><Plus size={16} /> Add {config.singularName}</button>
        </div>
      </div>

      <div className="glass-card" style={{ gridColumn: 'span 4', padding: '24px', borderRadius: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '12px', flex: 1 }}>
            <label className="portal-search" style={{ flex: 0.6, maxWidth: '400px' }}>
              <Search size={16} />
              <input placeholder={`Search ${entity.toLowerCase()}...`} />
            </label>
            {config.filters.map((filter: any) => (
              <label key={filter.label} className="portal-search" style={{ width: '200px', padding: '0 12px' }}>
                <Filter size={16} />
                <select style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--text)', width: '100%', fontSize: '0.9rem' }}>
                  <option value="">{filter.label}</option>
                  {filter.options.map((o: any) => <option key={o} value={o}>{o}</option>)}
                </select>
              </label>
            ))}
          </div>
        </div>

        <div className="portal-table-wrapper" style={{ margin: 0 }}>
          <table className="portal-table">
            <thead>
              <tr>
                {config.columns.map((col: any) => <th key={col.key}>{col.label}</th>)}
                <th style={{ width: '50px' }}></th>
              </tr>
            </thead>
            <tbody>
              {data.map((row: any, idx) => (
                <tr key={idx}>
                  {config.columns.map((col: any) => (
                    <td key={col.key}>
                      {col.render ? col.render(row) : <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{row[col.key]}</span>}
                    </td>
                  ))}
                  <td>
                    <button className="ghost-btn" style={{ padding: '8px' }}><MoreVertical size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Showing 1 to {data.length} of {data.length * 5} {entity.toLowerCase()}</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="outline-btn" style={{ padding: '6px 12px' }}>Previous</button>
            <button className="gradient-btn" style={{ padding: '6px 12px' }}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// ENTITY CONFIGURATIONS & MOCK DATA
// -------------------------------------------------------------

const renderStatus = (row: any) => (
  <span className={`status-chip ${row.status === 'Active' || row.status === 'Paid' || row.status === 'Issued' || row.status === 'Resolved' ? 'status-completed' : row.status === 'Pending' || row.status === 'Open' ? 'status-ongoing' : 'status-upcoming'}`}>
    {row.status}
  </span>
);

const renderBold = (key: string) => (row: any) => (
  <div style={{ fontWeight: 600, color: 'var(--text)' }}>{row[key]}</div>
);

const entityConfigs: Record<EntityType, any> = {
  "Student Profiles": {
    singularName: "Learner",
    columns: [
      { key: "name", label: "Learner Name", render: renderBold("name") },
      { key: "email", label: "Email Address" },
      { key: "company", label: "Company / Org" },
      { key: "joined", label: "Joined Date" },
      { key: "status", label: "Status", render: renderStatus }
    ],
    filters: [{ label: "All Status", options: ["Active", "Inactive", "Suspended"] }]
  },
  "Enrollment": {
    singularName: "Enrollment",
    columns: [
      { key: "name", label: "Learner Name", render: renderBold("name") },
      { key: "cohort", label: "Assigned Cohort" },
      { key: "path", label: "Learning Path" },
      { key: "progress", label: "Progress", render: (r:any) => <span style={{ fontWeight: 600, color: 'var(--purple)' }}>{r.progress}</span> },
      { key: "status", label: "Status", render: renderStatus }
    ],
    filters: [{ label: "Cohort", options: ["Winter 2026 Bootcamp", "Enterprise React - Q3"] }]
  },
  "Attendance": {
    singularName: "Attendance Log",
    columns: [
      { key: "name", label: "Learner Name", render: renderBold("name") },
      { key: "session", label: "Recent Session" },
      { key: "date", label: "Date" },
      { key: "status", label: "Status", render: renderStatus }
    ],
    filters: [{ label: "Session Type", options: ["Live Webinar", "Workshop", "Q&A"] }]
  },
  "Certifications": {
    singularName: "Certificate",
    columns: [
      { key: "name", label: "Learner Name", render: renderBold("name") },
      { key: "cert", label: "Certification Title" },
      { key: "score", label: "Final Score", render: (r:any) => <span style={{ fontWeight: 600, color: 'var(--emerald)' }}>{r.score}</span> },
      { key: "issueDate", label: "Issue Date" },
      { key: "status", label: "Status", render: renderStatus }
    ],
    filters: [{ label: "Certification", options: ["Product Design Pro", "Frontend Engineer", "Scrum Master"] }]
  },
  "Payments": {
    singularName: "Invoice",
    columns: [
      { key: "name", label: "Learner / Company", render: renderBold("name") },
      { key: "plan", label: "Subscription Plan" },
      { key: "amount", label: "Amount", render: (r:any) => <span style={{ fontWeight: 600, color: 'var(--purple)' }}>{r.amount}</span> },
      { key: "date", label: "Billing Date" },
      { key: "status", label: "Status", render: renderStatus }
    ],
    filters: [{ label: "Status", options: ["Paid", "Pending", "Overdue"] }]
  },
  "Resource Library": {
    singularName: "Resource Grant",
    columns: [
      { key: "name", label: "Learner Name", render: renderBold("name") },
      { key: "resource", label: "Resource Accessed", render: (r:any) => <span style={{ color: 'var(--purple)', fontWeight: 600 }}>{r.resource}</span> },
      { key: "type", label: "Resource Type" },
      { key: "date", label: "Access Date" },
    ],
    filters: [{ label: "Resource Type", options: ["E-Book", "Software License", "Video Archive"] }]
  },
  "Support Tickets": {
    singularName: "Ticket",
    columns: [
      { key: "id", label: "Ticket ID", render: (r:any) => <span style={{ fontFamily: 'monospace', color: 'var(--muted)' }}>{r.id}</span> },
      { key: "name", label: "Learner Name", render: renderBold("name") },
      { key: "subject", label: "Subject" },
      { key: "date", label: "Date Logged" },
      { key: "status", label: "Status", render: renderStatus }
    ],
    filters: [{ label: "Status", options: ["Open", "In Progress", "Resolved"] }]
  }
};

const mockData: Record<EntityType, any[]> = {
  "Student Profiles": [
    { name: "John Doe", email: "john@example.com", company: "Acme Corp", joined: "12 Jan 2026", status: "Active" },
    { name: "Jane Smith", email: "jane@startup.io", company: "Startup.io", joined: "15 Feb 2026", status: "Active" },
    { name: "Mike Johnson", email: "mike@enterprise.net", company: "Enterprise LLC", joined: "20 Mar 2026", status: "Inactive" },
  ],
  "Enrollment": [
    { name: "John Doe", cohort: "Winter 2026 Bootcamp", path: "Product Design Professional", progress: "45%", status: "Active" },
    { name: "Jane Smith", cohort: "Enterprise React - Q3", path: "Frontend Engineering Track", progress: "12%", status: "Active" },
    { name: "Mike Johnson", cohort: "Scrum Master Alpha", path: "Scrum Master Certification", progress: "100%", status: "Completed" },
  ],
  "Attendance": [
    { name: "John Doe", session: "Figma Prototyping Basics", date: "15 Apr 2026", status: "Present" },
    { name: "Jane Smith", session: "React State Management", date: "16 Apr 2026", status: "Present" },
    { name: "Mike Johnson", session: "Agile Leadership Q&A", date: "10 Mar 2026", status: "Absent" },
  ],
  "Certifications": [
    { name: "Mike Johnson", cert: "Scrum Master Certification", score: "94%", issueDate: "20 Mar 2026", status: "Issued" },
    { name: "Sarah Connor", cert: "Frontend Engineering Track", score: "88%", issueDate: "15 Feb 2026", status: "Issued" },
    { name: "John Doe", cert: "Product Design Professional", score: "-", issueDate: "-", status: "Pending" },
  ],
  "Payments": [
    { name: "Enterprise LLC", plan: "Enterprise Annual Plan", amount: "$4,990.00", date: "01 Jan 2026", status: "Paid" },
    { name: "John Doe", plan: "Pro Monthly Subscription", amount: "$49.00", date: "01 Apr 2026", status: "Paid" },
    { name: "Jane Smith", plan: "Pro Monthly Subscription", amount: "$49.00", date: "01 Apr 2026", status: "Pending" },
  ],
  "Resource Library": [
    { name: "John Doe", resource: "Advanced UI Patterns E-Book", type: "E-Book", date: "14 Apr 2026" },
    { name: "Jane Smith", resource: "WebStorm Pro License", type: "Software License", date: "10 Apr 2026" },
    { name: "Mike Johnson", resource: "Leadership Webinar Recording", type: "Video Archive", date: "22 Mar 2026" },
  ],
  "Support Tickets": [
    { id: "TK-1042", name: "Jane Smith", subject: "Cannot access React Module 4", date: "16 Apr 2026", status: "Open" },
    { id: "TK-1041", name: "John Doe", subject: "Billing invoice request", date: "15 Apr 2026", status: "Resolved" },
    { id: "TK-1039", name: "Mike Johnson", subject: "Certificate name correction", date: "21 Mar 2026", status: "Resolved" },
  ]
};

// -------------------------------------------------------------
// CREATION DRAWER
// -------------------------------------------------------------

function EntityCreateDrawer({ entity, onCancel, onSave }: { entity: EntityType, onCancel: () => void, onSave: () => void }) {
  const config = entityConfigs[entity];

  return (
    <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '500px', background: 'var(--bg-panel)', boxShadow: '-10px 0 40px rgba(0,0,0,0.1)', zIndex: 100, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(20px)' }}>
        <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Create {config.singularName}</h2>
        <button className="ghost-btn" onClick={onCancel} style={{ padding: '8px' }}><X size={20} /></button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
        <div className="wizard-form-grid" style={{ gridTemplateColumns: '1fr', gap: '20px' }}>
          {config.columns.filter((c:any) => c.key !== 'status' && c.key !== 'id').map((col:any) => (
            <label key={col.key} className="form-group">
              <span>{col.label}</span>
              {col.key === 'cohort' || col.key === 'path' || col.key === 'plan' || col.key === 'type' ? (
                <select className="portal-input">
                  <option>Select {col.label.toLowerCase()}...</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
              ) : (
                <input type={col.key.toLowerCase().includes('date') ? 'date' : 'text'} className="portal-input" placeholder={`Enter ${col.label.toLowerCase()}...`} />
              )}
            </label>
          ))}
          {entity === 'Support Tickets' && (
            <label className="form-group">
              <span>Description</span>
              <textarea className="portal-input" rows={4} placeholder="Describe the issue..."></textarea>
            </label>
          )}
        </div>
      </div>

      <div style={{ padding: '24px 32px', borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'flex-end', gap: '12px', background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(20px)' }}>
        <button className="outline-btn" onClick={onCancel}>Cancel</button>
        <button className="gradient-btn" onClick={onSave}>Save {config.singularName}</button>
      </div>
    </div>
  );
}

function MetricPill({ title, value, text, icon: Icon, iconColor }: { title: React.ReactNode; value: string; text: React.ReactNode; icon: React.ElementType; iconColor: string }) {
  return (
    <motion.article
      whileHover={{ y: -6, boxShadow: "0 12px 30px rgba(108, 29, 95, 0.08)" }}
      transition={{ duration: 0.25 }}
      style={{
        flex: 1,
        background: "white",
        border: "1px solid rgba(0,0,0,0.04)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
        borderRadius: "32px",
        padding: "24px 16px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        minHeight: "240px"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", width: "100%", marginBottom: "16px" }}>
        <span style={{ fontSize: "0.9rem", fontWeight: 800, color: "var(--text-secondary)", lineHeight: 1.3, textAlign: 'left', marginLeft: '8px' }}>
          {title}
        </span>
        <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "transparent", color: iconColor, border: `1.5px solid ${iconColor}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginRight: '4px' }}>
          <Icon size={12} strokeWidth={3} />
        </div>
      </div>
      <strong style={{ fontSize: "2.6rem", fontWeight: 900, color: "var(--purple)", margin: "auto 0 auto 8px", lineHeight: 1 }}>{value}</strong>
      <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", margin: "16px 0 0 8px", lineHeight: 1.4, textAlign: 'left' }}>
        {text}
      </p>
    </motion.article>
  );
}
