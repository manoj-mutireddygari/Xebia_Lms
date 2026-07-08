import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, UserCheck, Shield, Clock, Search, Filter, Plus, Upload, Download,
  MoreVertical, X, ArrowRight, UploadCloud, FileText, CheckCircle
} from "lucide-react";

export function AdminUsersModule() {
  const [view, setView] = useState<"dashboard" | "wizard" | "bulk">("dashboard");

  return (
    <div className="attendance-module-wrapper">
      <AnimatePresence mode="wait">
        {view === "dashboard" && (
          <motion.div key="dashboard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            <UsersDashboard onStartWizard={() => setView("wizard")} onStartBulk={() => setView("bulk")} />
          </motion.div>
        )}
        {view === "wizard" && (
          <motion.div key="wizard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            <UserCreationWizard onCancel={() => setView("dashboard")} onComplete={() => setView("dashboard")} />
          </motion.div>
        )}
        {view === "bulk" && (
          <motion.div key="bulk" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            <BulkImportUI onCancel={() => setView("dashboard")} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function UsersDashboard({ onStartWizard, onStartBulk }: { onStartWizard: () => void, onStartBulk: () => void }) {
  return (
    <div className="portal-grid">
      <div className="workspace-header" style={{ gridColumn: 'span 4', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 0 }}>
        <div>
           <h2 className="module-title" style={{ margin: 0 }}>User Management</h2>
           <p style={{ color: 'var(--muted)', marginTop: '8px' }}>Manage all students, faculty, and administrative staff accounts.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="outline-btn" onClick={onStartBulk}>
            <Upload size={16} /> Bulk Import
          </button>
          <button className="gradient-btn" onClick={onStartWizard}>
            <Plus size={16} /> Add User
          </button>
        </div>
      </div>

      <div style={{ gridColumn: 'span 4', display: 'flex', gap: '16px' }}>
        <MetricPill title={<>Total<br/>Users</>} value="1,248" text={<>+12 this<br/>week</>} icon={Users} iconColor="var(--purple)" />
        <MetricPill title={<>Active<br/>Students</>} value="984" text={<>8 cohorts<br/>active</>} icon={UserCheck} iconColor="var(--emerald)" />
        <MetricPill title={<>Active<br/>Faculty</>} value="142" text={<>Across 12<br/>departments</>} icon={Shield} iconColor="var(--purple)" />
        <MetricPill title={<>Pending<br/>Approvals</>} value="24" text={<>Requires<br/>review</>} icon={Clock} iconColor="var(--amber)" />
      </div>

      <div className="glass-card" style={{ gridColumn: 'span 4', padding: '24px', borderRadius: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '12px', flex: 1 }}>
            <label className="portal-search" style={{ flex: 0.6, maxWidth: '400px' }}>
              <Search size={16} />
              <input placeholder="Search by name, ID, or email..." />
            </label>
            <label className="portal-search" style={{ width: '160px', padding: '0 12px' }}>
              <Filter size={16} />
              <select style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--text)', width: '100%', fontSize: '0.9rem' }}>
                <option value="">All Roles</option>
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
                <option value="admin">Admin</option>
              </select>
            </label>
            <label className="portal-search" style={{ width: '160px', padding: '0 12px' }}>
              <Filter size={16} />
              <select style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--text)', width: '100%', fontSize: '0.9rem' }}>
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="pending">Pending</option>
              </select>
            </label>
          </div>
          <button className="ghost-btn"><Download size={16} /> Export CSV</button>
        </div>

        <div className="portal-table-wrapper" style={{ margin: 0 }}>
          <table className="portal-table">
            <thead>
              <tr>
                <th>User Details</th>
                <th>Role</th>
                <th>Department</th>
                <th>Status</th>
                <th>Joined</th>
                <th style={{ width: '50px' }}></th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map(u => (
                <tr key={u.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div className="avatar-sm" style={{ background: u.avatarBg, color: u.avatarColor }}>
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--text)' }}>{u.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{u.email} • {u.id}</div>
                      </div>
                    </div>
                  </td>
                  <td><span style={{ fontWeight: 500, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{u.role}</span></td>
                  <td><span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{u.department}</span></td>
                  <td>
                    <span className={`status-chip ${u.status === 'Active' ? 'status-completed' : u.status === 'Pending' ? 'status-ongoing' : 'status-upcoming'}`}
                          style={u.status === 'Suspended' ? { background: '#ffebee', color: '#d32f2f' } : {}}>
                      {u.status}
                    </span>
                  </td>
                  <td><span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>{u.joined}</span></td>
                  <td>
                    <button className="ghost-btn" style={{ padding: '8px' }}><MoreVertical size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Showing 1 to 5 of 1,248 users</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="outline-btn" style={{ padding: '6px 12px' }}>Previous</button>
            <button className="gradient-btn" style={{ padding: '6px 12px' }}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserCreationWizard({ onCancel, onComplete }: { onCancel: () => void, onComplete: () => void }) {
  const [step, setStep] = useState(1);
  const nextStep = () => setStep(s => Math.min(4, s + 1));
  const prevStep = () => setStep(s => Math.max(1, s - 1));

  return (
    <div className="wizard-container glass-card" style={{ maxWidth: '700px', margin: '40px auto' }}>
      <div className="wizard-header">
        <button className="ghost-btn" onClick={onCancel} style={{ padding: '8px' }}><X size={20} /></button>
        <h2>Add New User</h2>
        <div className="wizard-steps-indicator">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className={`wizard-step-dot ${step >= s ? 'active' : ''}`} />
          ))}
        </div>
      </div>
      
      <div className="wizard-body">
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h3>Step 1: Basic Information</h3>
            <div className="wizard-form-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <label className="form-group span-2">
                <span>Full Name</span>
                <input type="text" className="portal-input" placeholder="e.g. Rahul Sharma" />
              </label>
              <label className="form-group span-2">
                <span>Email Address</span>
                <input type="email" className="portal-input" placeholder="rahul@xebia.com" />
              </label>
              <label className="form-group">
                <span>Phone Number</span>
                <input type="tel" className="portal-input" placeholder="+91 98765 43210" />
              </label>
              <label className="form-group">
                <span>Date of Birth</span>
                <input type="date" className="portal-input" />
              </label>
            </div>
          </motion.div>
        )}
        
        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h3>Step 2: Role & Department</h3>
            <div className="wizard-form-grid">
              <label className="form-group span-2">
                <span>Primary Role</span>
                <select className="portal-input">
                  <option>Student</option>
                  <option>Faculty</option>
                  <option>Admin</option>
                  <option>Librarian</option>
                </select>
              </label>
              <label className="form-group span-2">
                <span>Department / Program</span>
                <select className="portal-input">
                  <option>Computer Science & Engineering</option>
                  <option>Data Science</option>
                  <option>Business Administration</option>
                </select>
              </label>
              <label className="form-group span-2">
                <span>Batch / Cohort (If Student)</span>
                <select className="portal-input">
                  <option>Cohort 2026 - A</option>
                  <option>Cohort 2026 - B</option>
                </select>
              </label>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h3>Step 3: Permissions & Access</h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '16px' }}>Configure what this user can access within the portal.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {["Login Access", "Library Access", "Financial Module (Read-Only)", "Forum Posting"].map((perm, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', background: 'var(--bg-soft)', borderRadius: '12px', border: '1px solid var(--line)' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{perm}</div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked={i < 2} />
                    <span className="slider"></span>
                  </label>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ width: '64px', height: '64px', background: 'rgba(108, 29, 95, 0.1)', color: 'var(--purple)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <CheckCircle size={32} />
              </div>
              <h3>Ready to Create User</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto 24px' }}>
                An invitation email will be sent to <strong>rahul@xebia.com</strong> with instructions to set up their password.
              </p>
              
              <div style={{ background: 'var(--bg-soft)', padding: '16px', borderRadius: '12px', textAlign: 'left', border: '1px solid var(--line)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Name</span>
                  <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>Rahul Sharma</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Role</span>
                  <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>Student</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Department</span>
                  <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>Computer Science</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="wizard-footer">
        <button className="outline-btn" onClick={step === 1 ? onCancel : prevStep}>
          {step === 1 ? 'Cancel' : 'Back'}
        </button>
        <button className="gradient-btn" onClick={step === 4 ? onComplete : nextStep}>
          <span>{step === 4 ? 'Create User' : 'Next Step'}</span>
          {step !== 4 && <ArrowRight size={16} />}
        </button>
      </div>
    </div>
  );
}

function BulkImportUI({ onCancel }: { onCancel: () => void }) {
  return (
    <div className="wizard-container glass-card" style={{ maxWidth: '700px', margin: '40px auto' }}>
      <div className="wizard-header">
        <button className="ghost-btn" onClick={onCancel} style={{ padding: '8px' }}><X size={20} /></button>
        <h2>Bulk Import Users</h2>
      </div>
      <div className="wizard-body" style={{ textAlign: 'center', padding: '40px 20px' }}>
        <p style={{ color: 'var(--muted)', marginBottom: '32px' }}>Upload a CSV file containing user details to add them in bulk.</p>
        
        <div style={{ border: '2px dashed var(--purple)', borderRadius: '24px', padding: '60px 20px', background: 'rgba(108, 29, 95, 0.02)', cursor: 'pointer', transition: 'all 0.2s ease' }} 
             onMouseOver={(e) => e.currentTarget.style.background = 'rgba(108, 29, 95, 0.05)'}
             onMouseOut={(e) => e.currentTarget.style.background = 'rgba(108, 29, 95, 0.02)'}>
          <UploadCloud size={48} color="var(--purple)" style={{ marginBottom: '16px' }} />
          <h3 style={{ margin: '0 0 8px', color: 'var(--primary)' }}>Click or drag file to this area to upload</h3>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: 0 }}>Support for a single or bulk CSV file. Max size 10MB.</p>
        </div>

        <div style={{ marginTop: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>Need help formatting your data?</span>
          <button className="outline-btn" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
            <FileText size={14} /> Download CSV Template
          </button>
        </div>
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

const mockUsers = [
  { id: "XLM-2001", name: "Ananya Iyer", email: "ananya.i@xebia.com", role: "Student", department: "Computer Science", status: "Active", joined: "12 Aug 2025", avatarBg: "var(--parplight)", avatarColor: "var(--purple)" },
  { id: "XLM-1052", name: "Dr. Kavya Iyer", email: "kavya.i@xebia.com", role: "Faculty", department: "Artificial Intelligence", status: "Active", joined: "01 Feb 2024", avatarBg: "var(--emerald-light)", avatarColor: "var(--emerald)" },
  { id: "XLM-2045", name: "Rohan Sharma", email: "rohan.s@xebia.com", role: "Student", department: "Data Science", status: "Pending", joined: "05 Jul 2026", avatarBg: "#fff8e1", avatarColor: "var(--amber)" },
  { id: "XLM-0899", name: "Vikram Desai", email: "vikram.d@xebia.com", role: "Admin", department: "Administration", status: "Active", joined: "15 Jan 2023", avatarBg: "var(--parplight)", avatarColor: "var(--purple)" },
  { id: "XLM-2100", name: "Priya Patel", email: "priya.p@xebia.com", role: "Student", department: "Computer Science", status: "Suspended", joined: "20 Sep 2025", avatarBg: "#ffebee", avatarColor: "#d32f2f" },
];
