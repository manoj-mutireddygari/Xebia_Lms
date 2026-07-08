import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, ShieldAlert, ShieldCheck, Users, Plus, X, ArrowRight, Save, Edit3, Trash2
} from "lucide-react";

export function AdminRolesModule() {
  const [view, setView] = useState<"dashboard" | "create" | "edit">("dashboard");
  const [selectedRole, setSelectedRole] = useState<any>(null);

  const handleEditRole = (role: any) => {
    setSelectedRole(role);
    setView("edit");
  };

  return (
    <div className="attendance-module-wrapper">
      <AnimatePresence mode="wait">
        {view === "dashboard" && (
          <motion.div key="dashboard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            <RolesDashboard onStartCreate={() => setView("create")} onEditRole={handleEditRole} />
          </motion.div>
        )}
        {view === "create" && (
          <motion.div key="create" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            <RoleEditor onCancel={() => setView("dashboard")} onSave={() => setView("dashboard")} mode="create" />
          </motion.div>
        )}
        {view === "edit" && (
          <motion.div key="edit" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            <RoleEditor onCancel={() => setView("dashboard")} onSave={() => setView("dashboard")} mode="edit" initialData={selectedRole} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function RolesDashboard({ onStartCreate, onEditRole }: { onStartCreate: () => void, onEditRole: (r: any) => void }) {
  return (
    <div className="portal-grid">
      <div className="workspace-header" style={{ gridColumn: 'span 4', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 0 }}>
        <div>
           <h2 className="module-title" style={{ margin: 0 }}>Role & Permission Management</h2>
           <p style={{ color: 'var(--muted)', marginTop: '8px' }}>Define roles and granular access control for all system modules.</p>
        </div>
        <div>
          <button className="gradient-btn" onClick={onStartCreate}>
            <Plus size={16} /> Create Custom Role
          </button>
        </div>
      </div>

      <div style={{ gridColumn: 'span 4', display: 'flex', gap: '16px' }}>
        <MetricPill title={<>Total<br/>Roles</>} value="12" text={<>Active in system</>} icon={Shield} iconColor="var(--purple)" />
        <MetricPill title={<>Core<br/>Roles</>} value="04" text={<>System defined</>} icon={ShieldCheck} iconColor="var(--emerald)" />
        <MetricPill title={<>Custom<br/>Roles</>} value="08" text={<>User defined</>} icon={Users} iconColor="var(--amber)" />
        <MetricPill title={<>Security<br/>Alerts</>} value="02" text={<>Review excessive permissions</>} icon={ShieldAlert} iconColor="#d32f2f" />
      </div>

      <div style={{ gridColumn: 'span 4' }}>
        <h3 style={{ marginBottom: '16px', color: 'var(--text)' }}>System Core Roles</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {coreRoles.map(r => (
            <RoleCard key={r.id} role={r} onEdit={() => onEditRole(r)} />
          ))}
        </div>
      </div>

      <div style={{ gridColumn: 'span 4', marginTop: '16px' }}>
        <h3 style={{ marginBottom: '16px', color: 'var(--text)' }}>Custom Roles</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {customRoles.map(r => (
            <RoleCard key={r.id} role={r} onEdit={() => onEditRole(r)} />
          ))}
        </div>
      </div>
    </div>
  );
}

function RoleCard({ role, onEdit }: { role: any, onEdit: () => void }) {
  return (
    <div className="glass-card" style={{ padding: '24px', borderRadius: '20px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(108, 29, 95, 0.05)', color: 'var(--purple)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Shield size={24} strokeWidth={1.5} />
        </div>
        <span className="status-chip status-completed" style={{ background: role.type === 'core' ? 'rgba(1, 172, 159, 0.1)' : 'rgba(255, 152, 0, 0.1)', color: role.type === 'core' ? 'var(--emerald)' : 'var(--amber)' }}>
          {role.type === 'core' ? 'Core Role' : 'Custom Role'}
        </span>
      </div>
      <h3 style={{ margin: '0 0 8px', fontSize: '1.2rem', color: 'var(--text)' }}>{role.name}</h3>
      <p style={{ margin: '0 0 20px', fontSize: '0.85rem', color: 'var(--text-secondary)', flex: 1 }}>{role.description}</p>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--muted)', fontWeight: 600 }}>
          <Users size={16} /> {role.users} Users
        </div>
        <button className="ghost-btn" onClick={onEdit} style={{ padding: '6px 12px', fontSize: '0.85rem' }}>
          <Edit3 size={14} /> Edit Access
        </button>
      </div>
    </div>
  );
}

const modules = [
  "Users & Profiles",
  "Roles & Permissions",
  "Academics Setup",
  "Faculty Management",
  "Student Records",
  "Examinations",
  "Library & Assets",
  "Finance & Fees",
  "Reports & Analytics",
  "System Settings"
];

function RoleEditor({ onCancel, onSave, mode, initialData }: { onCancel: () => void, onSave: () => void, mode: "create" | "edit", initialData?: any }) {
  const [roleName, setRoleName] = useState(initialData?.name || "");
  const [roleDesc, setRoleDesc] = useState(initialData?.description || "");
  const [permissions, setPermissions] = useState<Record<string, Record<string, boolean>>>({});

  // Initialize permissions mockup
  useState(() => {
    const initialPerms: any = {};
    modules.forEach(m => {
      initialPerms[m] = {
        view: initialData ? Math.random() > 0.2 : true,
        create: initialData ? Math.random() > 0.5 : false,
        edit: initialData ? Math.random() > 0.5 : false,
        delete: initialData ? Math.random() > 0.8 : false,
      };
    });
    setPermissions(initialPerms);
  });

  const togglePermission = (mod: string, action: string) => {
    setPermissions(prev => ({
      ...prev,
      [mod]: {
        ...prev[mod],
        [action]: !prev[mod][action]
      }
    }));
  };

  const selectRow = (mod: string, state: boolean) => {
    setPermissions(prev => ({
      ...prev,
      [mod]: { view: state, create: state, edit: state, delete: state }
    }));
  };

  return (
    <div className="wizard-container glass-card" style={{ maxWidth: '1000px', margin: '40px auto' }}>
      <div className="wizard-header" style={{ padding: '24px 32px' }}>
        <button className="ghost-btn" onClick={onCancel} style={{ padding: '8px' }}><X size={20} /></button>
        <h2>{mode === 'create' ? 'Create Custom Role' : `Edit Access: ${initialData?.name}`}</h2>
        <div style={{ flex: 1 }}></div>
        <button className="outline-btn" onClick={onCancel} style={{ marginRight: '12px' }}>Cancel</button>
        <button className="gradient-btn" onClick={onSave}><Save size={16} /> Save Role</button>
      </div>

      <div className="wizard-body" style={{ padding: '32px' }}>
        <div className="wizard-form-grid" style={{ gridTemplateColumns: '1fr 2fr', marginBottom: '32px', paddingBottom: '32px', borderBottom: '1px solid var(--line)' }}>
          <label className="form-group">
            <span>Role Name</span>
            <input type="text" className="portal-input" value={roleName} onChange={e => setRoleName(e.target.value)} placeholder="e.g. IT Administrator" />
          </label>
          <label className="form-group">
            <span>Description</span>
            <input type="text" className="portal-input" value={roleDesc} onChange={e => setRoleDesc(e.target.value)} placeholder="Explain the purpose and scope of this role..." />
          </label>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3>Access Control Matrix</h3>
          <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Select the modules and specific actions this role can perform.</span>
        </div>

        <div className="portal-table-wrapper" style={{ margin: 0, borderRadius: '16px', border: '1px solid var(--line)' }}>
          <table className="portal-table" style={{ margin: 0 }}>
            <thead style={{ background: 'var(--bg-soft)' }}>
              <tr>
                <th style={{ width: '30%', paddingLeft: '24px' }}>System Module</th>
                <th style={{ textAlign: 'center' }}>View / Read</th>
                <th style={{ textAlign: 'center' }}>Create / Add</th>
                <th style={{ textAlign: 'center' }}>Edit / Update</th>
                <th style={{ textAlign: 'center' }}>Delete / Remove</th>
                <th style={{ textAlign: 'center', width: '100px' }}>Full Access</th>
              </tr>
            </thead>
            <tbody>
              {modules.map(m => (
                <tr key={m}>
                  <td style={{ paddingLeft: '24px', fontWeight: 600, color: 'var(--text-secondary)' }}>{m}</td>
                  <td style={{ textAlign: 'center' }}>
                    <input type="checkbox" checked={permissions[m]?.view || false} onChange={() => togglePermission(m, 'view')} style={{ width: '18px', height: '18px', accentColor: 'var(--purple)' }} />
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <input type="checkbox" checked={permissions[m]?.create || false} onChange={() => togglePermission(m, 'create')} style={{ width: '18px', height: '18px', accentColor: 'var(--purple)' }} />
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <input type="checkbox" checked={permissions[m]?.edit || false} onChange={() => togglePermission(m, 'edit')} style={{ width: '18px', height: '18px', accentColor: 'var(--purple)' }} />
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <input type="checkbox" checked={permissions[m]?.delete || false} onChange={() => togglePermission(m, 'delete')} style={{ width: '18px', height: '18px', accentColor: '#d32f2f' }} />
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button className="ghost-btn" onClick={() => selectRow(m, !(permissions[m]?.view && permissions[m]?.create && permissions[m]?.edit && permissions[m]?.delete))} style={{ padding: '4px 8px', fontSize: '0.75rem' }}>
                      Toggle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

const coreRoles = [
  { id: 1, type: 'core', name: 'Super Administrator', description: 'Full access to all system modules, configurations, and audit logs. Cannot be deleted.', users: 3 },
  { id: 2, type: 'core', name: 'Faculty', description: 'Standard teaching role. Access to assigned courses, grading, and attendance management.', users: 142 },
  { id: 3, type: 'core', name: 'Student', description: 'Standard learner role. Access to enrolled courses, assessments, and profile.', users: 984 },
  { id: 4, type: 'core', name: 'Librarian', description: 'Access restricted strictly to Library and Asset management modules.', users: 5 },
];

const customRoles = [
  { id: 5, type: 'custom', name: 'Finance Controller', description: 'Access to Finance, Fees, Invoicing and Revenue Analytics. Can process refunds.', users: 4 },
  { id: 6, type: 'custom', name: 'IT Support', description: 'Manage users, devices, and resolve login issues. No access to financial data.', users: 8 },
  { id: 7, type: 'custom', name: 'Content Creator', description: 'Manage course content, modules, and library resources. Cannot manage users.', users: 12 },
  { id: 8, type: 'custom', name: 'Auditor (Read-Only)', description: 'Read-only access across all modules for compliance and auditing purposes.', users: 2 },
];
