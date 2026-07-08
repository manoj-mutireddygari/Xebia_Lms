import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, Building2, Briefcase, Star, CalendarCheck, FileText,
  ArrowRight, Search, Filter, Plus, Download, MoreVertical, X
} from "lucide-react";

type EntityType = "Trainer Profiles" | "Categories" | "Workload" | "Performance" | "Attendance" | "Documents";

export function AdminTrainersModule() {
  const [view, setView] = useState<"dashboard" | "manage" | "create-entity">("dashboard");
  const [activeEntity, setActiveEntity] = useState<EntityType>("Trainer Profiles");

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
            <TrainersDashboard onManage={handleManage} />
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

function TrainersDashboard({ onManage }: { onManage: (e: EntityType) => void }) {
  return (
    <div className="portal-grid">
      <div className="workspace-header" style={{ gridColumn: 'span 4', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 0 }}>
        <div>
           <h2 className="module-title" style={{ margin: 0 }}>Trainer Management</h2>
           <p style={{ color: 'var(--muted)', marginTop: '8px' }}>Manage trainer profiles, assignments, performance, and documentation.</p>
        </div>
      </div>

      <div style={{ gridColumn: 'span 4', display: 'flex', gap: '16px' }}>
        <MetricPill title={<>Total<br/>Trainers</>} value="42" text={<>Registered in system</>} icon={Users} iconColor="var(--purple)" />
        <MetricPill title={<>Active<br/>Trainers</>} value="38" text={<>Currently teaching</>} icon={Briefcase} iconColor="var(--emerald)" />
        <MetricPill title={<>Average<br/>Rating</>} value="4.8" text={<>Out of 5.0</>} icon={Star} iconColor="var(--amber)" />
        <MetricPill title={<>Upcoming<br/>Sessions</>} value="12" text={<>Next 7 days</>} icon={CalendarCheck} iconColor="var(--purple)" />
      </div>

      <div style={{ gridColumn: 'span 4', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px', marginTop: '8px' }}>
        <SummaryCard title="Trainer Profiles" count="42" desc="Manage trainer accounts and details" icon={Users} onClick={() => onManage("Trainer Profiles")} primary />
        <SummaryCard title="Categories" count="8" desc="Content and discipline assignments" icon={Building2} onClick={() => onManage("Categories")} />
        <SummaryCard title="Workload" count="38" desc="Track assigned cohorts and hours" icon={Briefcase} onClick={() => onManage("Workload")} />
        <SummaryCard title="Performance" count="4.8" desc="Average ratings and feedback" icon={Star} onClick={() => onManage("Performance")} />
        <SummaryCard title="Attendance" count="98%" desc="Trainer session attendance tracking" icon={CalendarCheck} onClick={() => onManage("Attendance")} />
        <SummaryCard title="Documents" count="120" desc="Contracts, NDAs, and certifications" icon={FileText} onClick={() => onManage("Documents")} />
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
           <button className="ghost-btn" onClick={onBack} style={{ padding: 0, marginBottom: '8px' }}><ArrowRight size={16} style={{ transform: 'rotate(180deg)', marginRight: '4px' }} /> Back to Trainers Dashboard</button>
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
          <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Showing 1 to {data.length} of {data.length * 3} {entity.toLowerCase()}</span>
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
  <span className={`status-chip ${row.status === 'Active' || row.status === 'Verified' || row.status === 'Excellent' ? 'status-completed' : row.status === 'Pending' || row.status === 'Average' ? 'status-ongoing' : 'status-upcoming'}`}>
    {row.status}
  </span>
);

const renderBold = (key: string) => (row: any) => (
  <div style={{ fontWeight: 600, color: 'var(--text)' }}>{row[key]}</div>
);

const entityConfigs: Record<EntityType, any> = {
  "Trainer Profiles": {
    singularName: "Trainer",
    columns: [
      { key: "name", label: "Trainer Name", render: renderBold("name") },
      { key: "email", label: "Email Address" },
      { key: "category", label: "Category" },
      { key: "joined", label: "Joined Date" },
      { key: "status", label: "Status", render: renderStatus }
    ],
    filters: [{ label: "All Categories", options: ["UI/UX Design", "Software Dev", "Leadership"] }]
  },
  "Categories": {
    singularName: "Category Mapping",
    columns: [
      { key: "name", label: "Category Name", render: renderBold("name") },
      { key: "lead", label: "Lead Trainer" },
      { key: "trainers", label: "Total Trainers" },
      { key: "courses", label: "Active Courses" },
      { key: "status", label: "Status", render: renderStatus }
    ],
    filters: [{ label: "All Status", options: ["Active", "Archived"] }]
  },
  "Workload": {
    singularName: "Workload Allocation",
    columns: [
      { key: "name", label: "Trainer Name", render: renderBold("name") },
      { key: "cohorts", label: "Active Cohorts" },
      { key: "hours", label: "Weekly Hours", render: (r:any) => <span style={{ fontWeight: 600, color: 'var(--purple)' }}>{r.hours} hrs</span> },
      { key: "capacity", label: "Capacity Utilization" },
      { key: "status", label: "Status", render: renderStatus }
    ],
    filters: [{ label: "Utilization Level", options: ["Underutilized", "Optimal", "Overloaded"] }]
  },
  "Performance": {
    singularName: "Performance Review",
    columns: [
      { key: "name", label: "Trainer Name", render: renderBold("name") },
      { key: "rating", label: "Avg Rating", render: (r:any) => <span style={{ fontWeight: 600, color: 'var(--amber)' }}>⭐ {r.rating}</span> },
      { key: "feedback", label: "Feedback Score" },
      { key: "completion", label: "Completion Rate" },
      { key: "status", label: "Evaluation", render: renderStatus }
    ],
    filters: [{ label: "Evaluation Level", options: ["Excellent", "Good", "Average", "Needs Improvement"] }]
  },
  "Attendance": {
    singularName: "Attendance Record",
    columns: [
      { key: "name", label: "Trainer Name", render: renderBold("name") },
      { key: "sessions", label: "Total Sessions" },
      { key: "attended", label: "Sessions Attended" },
      { key: "rate", label: "Attendance Rate", render: (r:any) => <span style={{ fontWeight: 600, color: 'var(--emerald)' }}>{r.rate}</span> },
      { key: "status", label: "Status", render: renderStatus }
    ],
    filters: [{ label: "Attendance Range", options: ["Below 80%", "80% - 95%", "Above 95%"] }]
  },
  "Documents": {
    singularName: "Document",
    columns: [
      { key: "name", label: "Trainer Name", render: renderBold("name") },
      { key: "type", label: "Document Type", render: (r:any) => <span style={{ color: 'var(--purple)', fontWeight: 600 }}>{r.type}</span> },
      { key: "uploaded", label: "Upload Date" },
      { key: "expiry", label: "Expiry Date" },
      { key: "status", label: "Status", render: renderStatus }
    ],
    filters: [{ label: "Document Type", options: ["Contract", "NDA", "Certification"] }]
  }
};

const mockData: Record<EntityType, any[]> = {
  "Trainer Profiles": [
    { name: "Dr. Kavya Iyer", email: "kavya.i@xebia.com", category: "Software Development", joined: "12 Jan 2024", status: "Active" },
    { name: "Rahul Sharma", email: "rahul.s@xebia.com", category: "UI/UX Design", joined: "05 Mar 2025", status: "Active" },
    { name: "Anita Desai", email: "anita.d@xebia.com", category: "Leadership", joined: "20 Aug 2025", status: "Inactive" },
  ],
  "Categories": [
    { name: "UI/UX Design", lead: "Rahul Sharma", trainers: 8, courses: 14, status: "Active" },
    { name: "Software Development", lead: "Dr. Kavya Iyer", trainers: 22, courses: 45, status: "Active" },
    { name: "Leadership", lead: "Mark Owen", trainers: 5, courses: 8, status: "Active" },
  ],
  "Workload": [
    { name: "Dr. Kavya Iyer", cohorts: 4, hours: "32", capacity: "85%", status: "Optimal" },
    { name: "Rahul Sharma", cohorts: 5, hours: "40", capacity: "100%", status: "Overloaded" },
    { name: "Anita Desai", cohorts: 1, hours: "8", capacity: "20%", status: "Underutilized" },
  ],
  "Performance": [
    { name: "Dr. Kavya Iyer", rating: "4.9", feedback: "98%", completion: "95%", status: "Excellent" },
    { name: "Rahul Sharma", rating: "4.7", feedback: "92%", completion: "88%", status: "Good" },
    { name: "Anita Desai", rating: "4.1", feedback: "78%", completion: "75%", status: "Average" },
  ],
  "Attendance": [
    { name: "Dr. Kavya Iyer", sessions: 48, attended: 48, rate: "100%", status: "Excellent" },
    { name: "Rahul Sharma", sessions: 60, attended: 58, rate: "96%", status: "Good" },
    { name: "Anita Desai", sessions: 12, attended: 10, rate: "83%", status: "Average" },
  ],
  "Documents": [
    { name: "Dr. Kavya Iyer", type: "Master Service Agreement", uploaded: "15 Jan 2024", expiry: "15 Jan 2027", status: "Verified" },
    { name: "Rahul Sharma", type: "NDA", uploaded: "06 Mar 2025", expiry: "No Expiry", status: "Verified" },
    { name: "Anita Desai", type: "AWS Certification", uploaded: "22 Aug 2025", expiry: "22 Aug 2026", status: "Expiring Soon" },
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
          {config.columns.filter((c:any) => c.key !== 'status').map((col:any) => (
            <label key={col.key} className="form-group">
              <span>{col.label}</span>
              {col.key === 'category' ? (
                <select className="portal-input">
                  <option>Select {col.label.toLowerCase()}...</option>
                  <option>UI/UX Design</option>
                  <option>Software Development</option>
                </select>
              ) : col.key === 'type' ? (
                <select className="portal-input">
                  <option>Select document type...</option>
                  <option>NDA</option>
                  <option>Contract</option>
                  <option>Certification</option>
                </select>
              ) : (
                <input type={col.key.toLowerCase().includes('date') || col.key.toLowerCase().includes('expiry') || col.key.toLowerCase().includes('joined') ? 'date' : 'text'} className="portal-input" placeholder={`Enter ${col.label.toLowerCase()}...`} />
              )}
            </label>
          ))}
          {entity === 'Documents' && (
            <div style={{ marginTop: '20px', border: '1px dashed var(--purple)', padding: '24px', borderRadius: '12px', textAlign: 'center', background: 'var(--bg-soft)' }}>
              <FileText size={32} color="var(--purple)" style={{ marginBottom: '12px' }} />
              <div style={{ fontWeight: 600 }}>Upload Document (PDF)</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Drag and drop or click to browse</div>
            </div>
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
