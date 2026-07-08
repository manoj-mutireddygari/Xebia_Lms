import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, CalendarCheck, IndianRupee, Library, Award, Users, 
  UserCircle, Settings2, ArrowRight, Download, Filter, FileJson, FileSpreadsheet
} from "lucide-react";

type ReportCategory = "Course Reports" | "Attendance Reports" | "Finance Reports" | "Resource Access Reports" | "Certification Reports" | "Trainer Reports" | "Learner Reports" | "Custom Export";

export function AdminReportsModule() {
  const [view, setView] = useState<"dashboard" | "builder">("dashboard");
  const [activeReport, setActiveReport] = useState<ReportCategory>("Course Reports");

  const handleOpenBuilder = (report: ReportCategory) => {
    setActiveReport(report);
    setView("builder");
  };

  return (
    <div className="attendance-module-wrapper">
      <AnimatePresence mode="wait">
        {view === "dashboard" && (
          <motion.div key="dashboard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            <ReportsDashboard onOpenBuilder={handleOpenBuilder} />
          </motion.div>
        )}
        {view === "builder" && (
          <motion.div key="builder" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            <ReportBuilder reportType={activeReport} onBack={() => setView("dashboard")} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ReportsDashboard({ onOpenBuilder }: { onOpenBuilder: (r: ReportCategory) => void }) {
  return (
    <div className="portal-grid">
      <div className="workspace-header" style={{ gridColumn: 'span 4', paddingBottom: 0 }}>
        <h2 className="module-title" style={{ margin: 0 }}>Report Generation</h2>
        <p style={{ color: 'var(--muted)', marginTop: '8px' }}>Generate and export detailed data across all LMS modules.</p>
      </div>

      <div style={{ gridColumn: 'span 4', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px', marginTop: '8px' }}>
        <ReportCard title="Course Reports" desc="Completion rates, active cohorts, and curriculum popularity." icon={FileText} onClick={() => onOpenBuilder("Course Reports")} primary />
        <ReportCard title="Attendance Reports" desc="Session logs for live webinars and workshops." icon={CalendarCheck} onClick={() => onOpenBuilder("Attendance Reports")} />
        <ReportCard title="Finance Reports" desc="Detailed logs of Fee Collections and Trainer Payouts." icon={IndianRupee} onClick={() => onOpenBuilder("Finance Reports")} />
        <ReportCard title="Resource Access Reports" desc="Track which learners downloaded premium materials." icon={Library} onClick={() => onOpenBuilder("Resource Access Reports")} />
        <ReportCard title="Certification Reports" desc="Pass rates, average scores, and certificates issued." icon={Award} onClick={() => onOpenBuilder("Certification Reports")} />
        <ReportCard title="Trainer Reports" desc="Trainer workload, hours billed, and learner feedback." icon={Users} onClick={() => onOpenBuilder("Trainer Reports")} />
        <ReportCard title="Learner Reports" desc="Detailed engagement metrics per learner." icon={UserCircle} onClick={() => onOpenBuilder("Learner Reports")} />
        <ReportCard title="Custom Export Builder" desc="Select specific data points for a raw CSV/PDF dump." icon={Settings2} onClick={() => onOpenBuilder("Custom Export")} />
      </div>
    </div>
  );
}

function ReportCard({ title, desc, icon: Icon, onClick, primary = false }: { title: string, desc: string, icon: React.ElementType, onClick?: () => void, primary?: boolean }) {
  return (
    <motion.article
      whileHover={{ y: -4, boxShadow: "0 12px 30px rgba(108, 29, 95, 0.08)" }}
      transition={{ duration: 0.2 }}
      className="glass-card"
      style={{ padding: '24px', borderRadius: '20px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
      onClick={onClick}
    >
      {primary && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'var(--gradient-brand)' }} />}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: primary ? 'var(--gradient-brand)' : 'var(--bg-soft)', color: primary ? 'white' : 'var(--purple)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={24} strokeWidth={1.5} />
        </div>
      </div>
      <h3 style={{ margin: '0 0 8px', fontSize: '1.2rem', color: 'var(--text)' }}>{title}</h3>
      <p style={{ margin: '0 0 24px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{desc}</p>
      
      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--purple)', fontSize: '0.9rem', fontWeight: 600 }}>
        Build Report <ArrowRight size={16} />
      </div>
    </motion.article>
  );
}

// -------------------------------------------------------------
// REPORT BUILDER
// -------------------------------------------------------------

function ReportBuilder({ reportType, onBack }: { reportType: ReportCategory, onBack: () => void }) {
  const isCustom = reportType === "Custom Export";
  const config = reportConfigs[reportType];
  const data = mockReportData[reportType];

  return (
    <div className="portal-grid">
      <div className="workspace-header" style={{ gridColumn: 'span 4', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 0 }}>
        <div>
           <button className="ghost-btn" onClick={onBack} style={{ padding: 0, marginBottom: '8px' }}><ArrowRight size={16} style={{ transform: 'rotate(180deg)', marginRight: '4px' }} /> Back to Categories</button>
           <h2 className="module-title" style={{ margin: 0 }}>{reportType}</h2>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="outline-btn"><FileJson size={16} /> Export JSON</button>
          <button className="gradient-btn"><FileSpreadsheet size={16} /> Download CSV</button>
        </div>
      </div>

      <div style={{ gridColumn: 'span 4', display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
        
        {/* FILTERS PANEL */}
        <div className="glass-card" style={{ width: '300px', padding: '24px', borderRadius: '24px', flexShrink: 0, position: 'sticky', top: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', color: 'var(--text)', fontWeight: 600 }}>
            <Filter size={18} /> Report Filters
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <label className="form-group">
              <span style={{ fontSize: '0.85rem' }}>Date Range</span>
              <select className="portal-input" defaultValue="This Quarter">
                <option>Last 30 Days</option>
                <option>This Quarter</option>
                <option>Year to Date</option>
                <option>Custom Range...</option>
              </select>
            </label>

            {isCustom ? (
              <>
                <label className="form-group">
                  <span style={{ fontSize: '0.85rem' }}>Primary Entity</span>
                  <select className="portal-input">
                    <option>Users</option>
                    <option>Transactions</option>
                    <option>Attendance</option>
                    <option>Assessments</option>
                  </select>
                </label>
                <div style={{ padding: '16px', background: 'var(--bg-soft)', borderRadius: '12px' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '12px' }}>Data Columns</span>
                  {['ID', 'Name', 'Email', 'Role', 'Status', 'Created At'].map(col => (
                    <label key={col} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '0.85rem' }}>
                      <input type="checkbox" defaultChecked /> {col}
                    </label>
                  ))}
                </div>
              </>
            ) : (
              config?.filters.map((filter: any) => (
                <label key={filter.label} className="form-group">
                  <span style={{ fontSize: '0.85rem' }}>{filter.label}</span>
                  <select className="portal-input">
                    <option>All {filter.label}s</option>
                    {filter.options.map((opt: string) => <option key={opt}>{opt}</option>)}
                  </select>
                </label>
              ))
            )}

            <button className="gradient-btn" style={{ width: '100%', marginTop: '8px' }}>Apply Filters</button>
          </div>
        </div>

        {/* DATA PREVIEW */}
        <div className="glass-card" style={{ flex: 1, padding: '24px', borderRadius: '24px', minWidth: 0 }}>
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ margin: '0 0 8px', fontSize: '1.1rem' }}>Data Preview</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--muted)' }}>Showing a sample of the first 50 rows based on applied filters.</p>
          </div>

          <div className="portal-table-wrapper" style={{ margin: 0 }}>
            <table className="portal-table">
              <thead>
                <tr>
                  {isCustom ? (
                    <>
                      <th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Status</th>
                    </>
                  ) : (
                    config?.columns.map((col: any) => <th key={col.key}>{col.label}</th>)
                  )}
                </tr>
              </thead>
              <tbody>
                {data?.map((row: any, idx: number) => (
                  <tr key={idx}>
                    {isCustom ? (
                      <>
                        <td style={{ fontFamily: 'monospace', color: 'var(--muted)', fontSize: '0.85rem' }}>{row.id}</td>
                        <td style={{ fontWeight: 600 }}>{row.name}</td>
                        <td>{row.email}</td>
                        <td>{row.role}</td>
                        <td><span className="status-chip status-completed">{row.status}</span></td>
                      </>
                    ) : (
                      config?.columns.map((col: any) => (
                        <td key={col.key}>
                          {col.render ? col.render(row) : <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{row[col.key]}</span>}
                        </td>
                      ))
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div style={{ padding: '16px', textAlign: 'center', color: 'var(--muted)', fontSize: '0.85rem', borderTop: '1px solid var(--line)', marginTop: '24px' }}>
            End of preview. Export the report to view all {data?.length * 15 || 500} records.
          </div>
        </div>

      </div>
    </div>
  );
}

// -------------------------------------------------------------
// CONFIGURATIONS & MOCK DATA
// -------------------------------------------------------------

const renderStatus = (row: any) => (
  <span className={`status-chip ${row.status === 'Paid' || row.status === 'Active' || row.status === 'Passed' ? 'status-completed' : row.status === 'Pending' || row.status === 'In Progress' ? 'status-ongoing' : 'status-upcoming'}`}>
    {row.status}
  </span>
);

const renderBold = (key: string) => (row: any) => (
  <div style={{ fontWeight: 600, color: 'var(--text)' }}>{row[key]}</div>
);

const reportConfigs: Record<string, any> = {
  "Course Reports": {
    columns: [
      { key: "course", label: "Course Name", render: renderBold("course") },
      { key: "cohorts", label: "Active Cohorts" },
      { key: "enrolled", label: "Total Enrolled" },
      { key: "completion", label: "Completion Rate", render: (r:any) => <span style={{ color: 'var(--purple)', fontWeight: 600 }}>{r.completion}</span> },
      { key: "rating", label: "Avg Rating" }
    ],
    filters: [{ label: "Category", options: ["Development", "Design", "Management"] }]
  },
  "Attendance Reports": {
    columns: [
      { key: "date", label: "Session Date" },
      { key: "cohort", label: "Cohort", render: renderBold("cohort") },
      { key: "trainer", label: "Trainer" },
      { key: "present", label: "Present" },
      { key: "absent", label: "Absent" },
      { key: "rate", label: "Attendance Rate", render: (r:any) => <span style={{ color: 'var(--emerald)', fontWeight: 600 }}>{r.rate}</span> }
    ],
    filters: [{ label: "Cohort", options: ["React Q3", "Design Sprint", "Agile Basics"] }, { label: "Trainer", options: ["Dr. Kavya", "Anil Desai"] }]
  },
  "Finance Reports": {
    columns: [
      { key: "id", label: "Txn ID", render: (r:any) => <span style={{ fontFamily: 'monospace', color: 'var(--muted)', fontSize: '0.85rem' }}>{r.id}</span> },
      { key: "date", label: "Date" },
      { key: "type", label: "Type", render: renderBold("type") },
      { key: "amount", label: "Amount" },
      { key: "status", label: "Status", render: renderStatus }
    ],
    filters: [{ label: "Type", options: ["Fee Collection", "Trainer Payout"] }]
  },
  "Resource Access Reports": {
    columns: [
      { key: "resource", label: "Resource Name", render: renderBold("resource") },
      { key: "type", label: "Type" },
      { key: "downloads", label: "Total Downloads" },
      { key: "unique", label: "Unique Users" },
    ],
    filters: [{ label: "Type", options: ["E-Book", "Software License", "Video"] }]
  },
  "Certification Reports": {
    columns: [
      { key: "cert", label: "Certification", render: renderBold("cert") },
      { key: "attempts", label: "Total Attempts" },
      { key: "passed", label: "Passed" },
      { key: "failed", label: "Failed" },
      { key: "avgScore", label: "Avg Score", render: (r:any) => <span style={{ color: 'var(--purple)', fontWeight: 600 }}>{r.avgScore}</span> }
    ],
    filters: [{ label: "Certification", options: ["React Dev Pro", "Scrum Master", "UI/UX Expert"] }]
  },
  "Trainer Reports": {
    columns: [
      { key: "name", label: "Trainer Name", render: renderBold("name") },
      { key: "sessions", label: "Sessions Delivered" },
      { key: "hours", label: "Hours Billed" },
      { key: "feedback", label: "Avg Feedback" },
      { key: "status", label: "Status", render: renderStatus }
    ],
    filters: [{ label: "Status", options: ["Active", "Inactive"] }]
  },
  "Learner Reports": {
    columns: [
      { key: "name", label: "Learner Name", render: renderBold("name") },
      { key: "cohort", label: "Current Cohort" },
      { key: "progress", label: "Course Progress" },
      { key: "attendance", label: "Attendance" },
      { key: "status", label: "Status", render: renderStatus }
    ],
    filters: [{ label: "Cohort", options: ["React Q3", "Design Sprint", "Agile Basics"] }]
  },
};

const mockReportData: Record<string, any[]> = {
  "Course Reports": [
    { course: "Enterprise React Track", cohorts: "4", enrolled: "250", completion: "85%", rating: "4.8/5" },
    { course: "Product Design Bootcamp", cohorts: "2", enrolled: "120", completion: "92%", rating: "4.9/5" },
    { course: "Scrum Master Alpha", cohorts: "6", enrolled: "400", completion: "95%", rating: "4.7/5" },
  ],
  "Attendance Reports": [
    { date: "15 Jul 2026", cohort: "Enterprise React Track", trainer: "Dr. Kavya", present: "58", absent: "2", rate: "96.6%" },
    { date: "14 Jul 2026", cohort: "Product Design Bootcamp", trainer: "Anil Desai", present: "28", absent: "2", rate: "93.3%" },
    { date: "12 Jul 2026", cohort: "Scrum Master Alpha", trainer: "Prof. Sharma", present: "98", absent: "2", rate: "98.0%" },
  ],
  "Finance Reports": [
    { id: "REC-90992", date: "08 Jul 2026", type: "Fee Collection", amount: "₹45,000", status: "Paid" },
    { id: "REC-90991", date: "08 Jul 2026", type: "Fee Collection", amount: "₹30,000", status: "Paid" },
    { id: "PAY-2026-06", date: "05 Jul 2026", type: "Trainer Payout", amount: "₹1,25,000", status: "In Progress" },
  ],
  "Resource Access Reports": [
    { resource: "React State Management E-Book", type: "E-Book", downloads: "450", unique: "410" },
    { resource: "Figma UI Kit 2026", type: "Asset", downloads: "320", unique: "295" },
    { resource: "WebStorm Pro Licenses", type: "Software", downloads: "85", unique: "85" },
  ],
  "Certification Reports": [
    { cert: "React Dev Pro", attempts: "120", passed: "105", failed: "15", avgScore: "88%" },
    { cert: "Scrum Master", attempts: "200", passed: "190", failed: "10", avgScore: "94%" },
    { cert: "UI/UX Expert", attempts: "80", passed: "75", failed: "5", avgScore: "91%" },
  ],
  "Trainer Reports": [
    { name: "Dr. Kavya", sessions: "14", hours: "42", feedback: "4.9/5", status: "Active" },
    { name: "Anil Desai", sessions: "8", hours: "24", feedback: "4.7/5", status: "Active" },
    { name: "Prof. Sharma", sessions: "12", hours: "36", feedback: "4.8/5", status: "Active" },
  ],
  "Learner Reports": [
    { name: "Rajesh Kumar", cohort: "React Q3", progress: "45%", attendance: "90%", status: "Active" },
    { name: "Sneha Sharma", cohort: "Design Sprint", progress: "80%", attendance: "100%", status: "Active" },
    { name: "Amit Singh", cohort: "Agile Basics", progress: "100%", attendance: "95%", status: "Passed" },
  ],
  "Custom Export": [
    { id: "USR-1001", name: "Dr. Kavya", email: "kavya@xebia.com", role: "Trainer", status: "Active" },
    { id: "USR-1002", name: "Rajesh Kumar", email: "rajesh@tech.com", role: "Learner", status: "Active" },
    { id: "USR-1003", name: "Sneha Sharma", email: "sneha@design.co", role: "Learner", status: "Active" },
  ]
};
