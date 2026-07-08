import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, Building2, GraduationCap, Network, CalendarDays, Layers, 
  ArrowRight, Search, Filter, Plus, FileText, Download, MoreVertical, X, CheckCircle
} from "lucide-react";

type EntityType = "Courses" | "Categories" | "Learning Paths" | "Modules" | "Access Plans" | "Cohorts";

export function AdminCurriculumModule() {
  const [view, setView] = useState<"dashboard" | "manage" | "create-course" | "create-entity">("dashboard");
  const [activeEntity, setActiveEntity] = useState<EntityType>("Courses");

  const handleManage = (entity: EntityType) => {
    setActiveEntity(entity);
    setView("manage");
  };

  const handleCreate = () => {
    if (activeEntity === "Courses") {
      setView("create-course");
    } else {
      setView("create-entity");
    }
  };

  return (
    <div className="attendance-module-wrapper">
      <AnimatePresence mode="wait">
        {view === "dashboard" && (
          <motion.div key="dashboard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            <CurriculumDashboard onManage={handleManage} />
          </motion.div>
        )}
        {view === "manage" && (
          <motion.div key="manage" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            <UnifiedEntityManager entity={activeEntity} onBack={() => setView("dashboard")} onStartCreate={handleCreate} />
          </motion.div>
        )}
        {view === "create-course" && (
          <motion.div key="create-course" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            <CreateCourseWizard onCancel={() => setView("manage")} onComplete={() => setView("manage")} />
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

function CurriculumDashboard({ onManage }: { onManage: (e: EntityType) => void }) {
  return (
    <div className="portal-grid">
      <div className="workspace-header" style={{ gridColumn: 'span 4', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 0 }}>
        <div>
           <h2 className="module-title" style={{ margin: 0 }}>Catalog & Curriculum</h2>
           <p style={{ color: 'var(--muted)', marginTop: '8px' }}>Manage your training programs, courses, and learning paths.</p>
        </div>
      </div>

      <div style={{ gridColumn: 'span 4', display: 'flex', gap: '16px' }}>
        <MetricPill title={<>Total<br/>Categories</>} value="08" text={<>Active disciplines</>} icon={Building2} iconColor="var(--purple)" />
        <MetricPill title={<>Learning<br/>Paths</>} value="14" text={<>Certification tracks</>} icon={GraduationCap} iconColor="var(--emerald)" />
        <MetricPill title={<>Published<br/>Courses</>} value="86" text={<>Available to users</>} icon={BookOpen} iconColor="var(--purple)" />
        <MetricPill title={<>Active<br/>Cohorts</>} value="24" text={<>Live training groups</>} icon={Network} iconColor="var(--emerald)" />
      </div>

      <div style={{ gridColumn: 'span 4', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px', marginTop: '8px' }}>
        <SummaryCard title="Courses" count="86" desc="Core training content and syllabi" icon={BookOpen} onClick={() => onManage("Courses")} primary />
        <SummaryCard title="Categories" count="8" desc="Organizational content disciplines" icon={Building2} onClick={() => onManage("Categories")} />
        <SummaryCard title="Learning Paths" count="14" desc="Structured certification tracks" icon={GraduationCap} onClick={() => onManage("Learning Paths")} />
        <SummaryCard title="Modules" count="340" desc="Individual course sections or lessons" icon={Layers} onClick={() => onManage("Modules")} />
        <SummaryCard title="Access Plans" count="3" desc="Subscription tiers and validity" icon={CalendarDays} onClick={() => onManage("Access Plans")} />
        <SummaryCard title="Cohorts" count="24" desc="Groups of users learning together" icon={Network} onClick={() => onManage("Cohorts")} />
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
           <button className="ghost-btn" onClick={onBack} style={{ padding: 0, marginBottom: '8px' }}><ArrowRight size={16} style={{ transform: 'rotate(180deg)', marginRight: '4px' }} /> Back to Curriculum</button>
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
// ENTITY CONFIGURATIONS & MOCK DATA (Corporate Pivot)
// -------------------------------------------------------------

const renderStatus = (row: any) => (
  <span className={`status-chip ${row.status === 'Active' || row.status === 'Published' ? 'status-completed' : 'status-upcoming'}`}>
    {row.status}
  </span>
);

const renderBold = (key: string) => (row: any) => (
  <div style={{ fontWeight: 600, color: 'var(--text)' }}>{row[key]}</div>
);

const entityConfigs: Record<EntityType, any> = {
  "Courses": {
    singularName: "Course",
    columns: [
      { key: "name", label: "Course Name", render: renderBold("name") },
      { key: "code", label: "Course Code", render: (r:any) => <span style={{ fontFamily: 'monospace', color: 'var(--muted)', fontSize: '0.9rem' }}>{r.code}</span> },
      { key: "category", label: "Category" },
      { key: "duration", label: "Duration", render: (r:any) => <span style={{ fontWeight: 600, color: 'var(--purple)', fontSize: '0.9rem' }}>{r.duration}</span> },
      { key: "status", label: "Status", render: renderStatus }
    ],
    filters: [{ label: "All Categories", options: ["UI/UX Design", "Software Dev", "Leadership"] }]
  },
  "Categories": {
    singularName: "Category",
    columns: [
      { key: "name", label: "Category Name", render: renderBold("name") },
      { key: "code", label: "Short Code", render: (r:any) => <span style={{ fontFamily: 'monospace', color: 'var(--muted)', fontSize: '0.9rem' }}>{r.code}</span> },
      { key: "manager", label: "Lead Instructor" },
      { key: "paths", label: "Learning Paths" },
      { key: "status", label: "Status", render: renderStatus }
    ],
    filters: [{ label: "All Status", options: ["Active", "Archived"] }]
  },
  "Learning Paths": {
    singularName: "Learning Path",
    columns: [
      { key: "name", label: "Path Name", render: renderBold("name") },
      { key: "level", label: "Difficulty Level" },
      { key: "category", label: "Category" },
      { key: "courses", label: "Total Courses" },
      { key: "status", label: "Status", render: renderStatus }
    ],
    filters: [{ label: "Difficulty Level", options: ["Beginner", "Intermediate", "Advanced"] }]
  },
  "Modules": {
    singularName: "Module",
    columns: [
      { key: "name", label: "Module Name", render: renderBold("name") },
      { key: "type", label: "Format", render: (r:any) => <span style={{ color: r.type === 'Video' ? 'var(--emerald)' : 'var(--amber)', fontSize: '0.9rem', fontWeight: 600 }}>{r.type}</span> },
      { key: "course", label: "Associated Course" },
      { key: "duration", label: "Duration" }
    ],
    filters: [{ label: "All Formats", options: ["Video", "Reading", "Quiz", "Project"] }]
  },
  "Access Plans": {
    singularName: "Access Plan",
    columns: [
      { key: "name", label: "Plan Name", render: renderBold("name") },
      { key: "billing", label: "Billing Cycle" },
      { key: "price", label: "Price", render: (r:any) => <span style={{ fontWeight: 600, color: 'var(--purple)' }}>{r.price}</span> },
      { key: "users", label: "Subscribers" },
      { key: "status", label: "Status", render: renderStatus }
    ],
    filters: [{ label: "Billing Cycle", options: ["Monthly", "Annual", "Lifetime"] }]
  },
  "Cohorts": {
    singularName: "Cohort",
    columns: [
      { key: "name", label: "Cohort Name", render: renderBold("name") },
      { key: "path", label: "Learning Path" },
      { key: "startDate", label: "Kickoff Date" },
      { key: "users", label: "Learners", render: (r:any) => <span style={{ fontWeight: 600, color: 'var(--purple)', fontSize: '0.9rem' }}>{r.users}</span> },
      { key: "status", label: "Status", render: renderStatus }
    ],
    filters: [{ label: "Status", options: ["Enrolling", "In Progress", "Completed"] }]
  }
};

const mockData: Record<EntityType, any[]> = {
  "Courses": [
    { name: "Advanced UI/UX Fundamentals", code: "DES-201", category: "UI/UX Design", duration: "12 Hours", status: "Published" },
    { name: "Figma Prototyping Masterclass", code: "DES-305", category: "UI/UX Design", duration: "8 Hours", status: "Published" },
    { name: "React for Enterprise Apps", code: "DEV-402", category: "Software Development", duration: "16 Hours", status: "Published" },
    { name: "Agile Leadership Practices", code: "LDR-101", category: "Leadership", duration: "6 Hours", status: "Draft" },
  ],
  "Categories": [
    { name: "UI/UX Design", code: "DES", manager: "Sarah Jenkins", paths: 3, status: "Active" },
    { name: "Software Development", code: "DEV", manager: "Mark O'Connor", paths: 5, status: "Active" },
    { name: "Leadership & Agile", code: "LDR", manager: "Dr. Amanda White", paths: 2, status: "Active" },
  ],
  "Learning Paths": [
    { name: "Product Design Professional", level: "Advanced", category: "UI/UX Design", courses: 6, status: "Active" },
    { name: "Frontend Engineering Track", level: "Intermediate", category: "Software Development", courses: 8, status: "Active" },
    { name: "Scrum Master Certification", level: "Beginner", category: "Leadership", courses: 3, status: "Active" },
  ],
  "Modules": [
    { name: "Introduction to Design Systems", type: "Video", course: "Advanced UI/UX Fundamentals", duration: "45 mins" },
    { name: "Component Architecture", type: "Reading", course: "React for Enterprise Apps", duration: "20 mins" },
    { name: "Wireframing Capstone", type: "Project", course: "Figma Prototyping Masterclass", duration: "2 Hours" },
  ],
  "Access Plans": [
    { name: "Pro Monthly Subscription", billing: "Monthly", price: "$49.00", users: 1240, status: "Active" },
    { name: "Enterprise Annual Plan", billing: "Annual", price: "$499.00", users: 380, status: "Active" },
    { name: "Lifetime Bootcamp Access", billing: "Lifetime", price: "$999.00", users: 85, status: "Active" },
  ],
  "Cohorts": [
    { name: "Winter 2026 Design Bootcamp", path: "Product Design Professional", startDate: "Dec 01, 2026", users: 45, status: "Enrolling" },
    { name: "Enterprise React Cohort - Q3", path: "Frontend Engineering Track", startDate: "Jul 15, 2026", users: 120, status: "In Progress" },
    { name: "Leadership Workshop Alpha", path: "Scrum Master Certification", startDate: "Jan 10, 2026", users: 30, status: "Completed" },
  ]
};

// -------------------------------------------------------------
// CREATION FORMS & WIZARDS
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
              {col.key === 'category' || col.key === 'path' ? (
                <select className="portal-input">
                  <option>Select {col.label.toLowerCase()}...</option>
                  <option>UI/UX Design</option>
                  <option>Software Development</option>
                </select>
              ) : (
                <input type={col.key.toLowerCase().includes('date') ? 'date' : 'text'} className="portal-input" placeholder={`Enter ${col.label.toLowerCase()}...`} />
              )}
            </label>
          ))}
          {entity === 'Categories' && (
            <label className="form-group">
              <span>Description</span>
              <textarea className="portal-input" rows={4} placeholder="Category overview..."></textarea>
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

function CreateCourseWizard({ onCancel, onComplete }: { onCancel: () => void, onComplete: () => void }) {
  const [step, setStep] = useState(1);
  const nextStep = () => setStep(s => Math.min(4, s + 1));
  const prevStep = () => setStep(s => Math.max(1, s - 1));

  return (
    <div className="wizard-container glass-card" style={{ maxWidth: '750px', margin: '40px auto' }}>
      <div className="wizard-header">
        <button className="ghost-btn" onClick={onCancel} style={{ padding: '8px' }}><X size={20} /></button>
        <h2>Create New Course</h2>
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
            <div className="wizard-form-grid">
              <label className="form-group span-2">
                <span>Course Title</span>
                <input type="text" className="portal-input" placeholder="e.g. Design Systems 101" />
              </label>
              <label className="form-group">
                <span>Course Code</span>
                <input type="text" className="portal-input" placeholder="e.g. DES-205" />
              </label>
              <label className="form-group">
                <span>Duration (Hours)</span>
                <input type="number" className="portal-input" placeholder="8" />
              </label>
              <label className="form-group span-2">
                <span>Course Description</span>
                <textarea className="portal-input" placeholder="Provide a brief overview of the course content..." rows={3}></textarea>
              </label>
            </div>
          </motion.div>
        )}
        
        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h3>Step 2: Catalog Hierarchy</h3>
            <div className="wizard-form-grid">
              <label className="form-group span-2">
                <span>Category</span>
                <select className="portal-input">
                  <option>UI/UX Design</option>
                  <option>Software Development</option>
                  <option>Leadership</option>
                </select>
              </label>
              <label className="form-group span-2">
                <span>Associated Learning Path</span>
                <select className="portal-input">
                  <option>Product Design Professional</option>
                  <option>Frontend Engineering Track</option>
                </select>
              </label>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h3>Step 3: Syllabus & Configuration</h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '16px' }}>Configure the structural requirements for this course.</p>
            <div className="wizard-form-grid">
              <label className="form-group span-2">
                <span>Prerequisites (Optional)</span>
                <select className="portal-input">
                  <option>Select required courses...</option>
                  <option>DES-101 - Intro to Figma</option>
                </select>
              </label>
            </div>
            <div style={{ marginTop: '20px', border: '1px dashed var(--purple)', padding: '24px', borderRadius: '12px', textAlign: 'center', background: 'var(--bg-soft)' }}>
              <FileText size={32} color="var(--purple)" style={{ marginBottom: '12px' }} />
              <div style={{ fontWeight: 600 }}>Upload Syllabus (PDF)</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Drag and drop or click to browse</div>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ width: '64px', height: '64px', background: 'rgba(108, 29, 95, 0.1)', color: 'var(--purple)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <CheckCircle size={32} />
              </div>
              <h3>Ready to Publish Course</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto 24px' }}>
                The course will be added to the catalog and available for cohort assignment.
              </p>
              
              <div style={{ background: 'var(--bg-soft)', padding: '16px', borderRadius: '12px', textAlign: 'left', border: '1px solid var(--line)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Course Title</span>
                  <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>Design Systems 101</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Code & Duration</span>
                  <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>DES-205 • 8 Hours</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Category</span>
                  <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>UI/UX Design</span>
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
          <span>{step === 4 ? 'Publish Course' : 'Next Step'}</span>
          {step !== 4 && <ArrowRight size={16} />}
        </button>
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
