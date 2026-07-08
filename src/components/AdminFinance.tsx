import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IndianRupee, TrendingUp, CreditCard, Receipt, FileText, 
  ArrowRight, Search, Filter, Plus, Download, MoreVertical, X, Calendar, ArrowUpRight, ArrowDownRight, Users
} from "lucide-react";
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar, Cell
} from "recharts";

type FinanceView = "Analytics" | "Fee Collections" | "Trainer Payouts" | "Pending Dues" | "Course Fees";

export function AdminFinanceModule() {
  const [activeView, setActiveView] = useState<FinanceView>("Analytics");
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className="attendance-module-wrapper" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      
      {/* TOP COMMAND CENTER KPIs */}
      <div className="workspace-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
           <h2 className="module-title" style={{ margin: 0 }}>Financial Command Center</h2>
           <p style={{ color: 'var(--muted)', marginTop: '8px' }}>Monitor course fee collections, pending dues, and trainer payouts.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="outline-btn"><Download size={16} /> Export CSV</button>
          <button className="gradient-btn" onClick={() => setShowCreate(true)}><Plus size={16} /> Log Transaction</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
        <MetricCard title="Total Collections (YTD)" value="₹1.24 Cr" trend="+12.5%" isPositive={true} icon={IndianRupee} iconColor="var(--purple)" />
        <MetricCard title="Trainer Payouts (YTD)" value="₹45.2 L" trend="+4.2%" isPositive={false} icon={Users} iconColor="var(--emerald)" />
        <MetricCard title="Pending Dues" value="₹8.5 L" trend="-2.1%" isPositive={true} icon={Receipt} iconColor="var(--amber)" />
        <MetricCard title="Processed Transactions" value="1,842" trend="+8.4%" isPositive={true} icon={CreditCard} iconColor="var(--purple)" />
      </div>

      {/* SPLIT PANE LAYOUT */}
      <div style={{ display: 'flex', flex: 1, gap: '24px', minHeight: 0 }}>
        
        {/* INNER SIDEBAR */}
        <div className="glass-card" style={{ width: '250px', padding: '16px', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--muted)', letterSpacing: '0.05em', margin: '8px 0 16px 12px' }}>Views</p>
          
          <SidebarItem active={activeView === "Analytics"} icon={TrendingUp} label="Collection Analytics" onClick={() => setActiveView("Analytics")} />
          <SidebarItem active={activeView === "Fee Collections"} icon={FileText} label="Fee Collections" onClick={() => setActiveView("Fee Collections")} />
          <SidebarItem active={activeView === "Pending Dues"} icon={Receipt} label="Pending Dues" onClick={() => setActiveView("Pending Dues")} badge="24" />
          <SidebarItem active={activeView === "Trainer Payouts"} icon={Users} label="Trainer Payouts" onClick={() => setActiveView("Trainer Payouts")} />
          
          <div style={{ height: '1px', background: 'var(--line)', margin: '16px 0' }} />
          <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--muted)', letterSpacing: '0.05em', margin: '0 0 16px 12px' }}>Configuration</p>
          
          <SidebarItem active={activeView === "Course Fees"} icon={CreditCard} label="Course Fees" onClick={() => setActiveView("Course Fees")} />
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="glass-card" style={{ flex: 1, padding: '24px', borderRadius: '24px', display: 'flex', flexDirection: 'column', minHeight: 0, overflowY: 'auto' }}>
          <AnimatePresence mode="wait">
            {activeView === "Analytics" && (
              <motion.div key="Analytics" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <RevenueAnalyticsView />
              </motion.div>
            )}
            {activeView === "Fee Collections" && (
              <motion.div key="Collections" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <TableView config={collectionsConfig} data={collectionsData} />
              </motion.div>
            )}
            {activeView === "Trainer Payouts" && (
              <motion.div key="Payouts" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <TableView config={payoutsConfig} data={payoutsData} />
              </motion.div>
            )}
            {activeView === "Pending Dues" && (
              <motion.div key="Pending" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <TableView config={pendingConfig} data={pendingData} />
              </motion.div>
            )}
            {activeView === "Course Fees" && (
              <motion.div key="Fees" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <TableView config={courseFeesConfig} data={courseFeesData} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {showCreate && <CreateTransactionDrawer onCancel={() => setShowCreate(false)} />}
      </AnimatePresence>
    </div>
  );
}

// -------------------------------------------------------------
// UI COMPONENTS
// -------------------------------------------------------------

function SidebarItem({ active, icon: Icon, label, onClick, badge }: { active: boolean, icon: any, label: string, onClick: () => void, badge?: string }) {
  return (
    <button 
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 16px', borderRadius: '12px', border: 'none', cursor: 'pointer',
        background: active ? 'rgba(108, 29, 95, 0.08)' : 'transparent',
        color: active ? 'var(--purple)' : 'var(--text-secondary)',
        fontWeight: active ? 600 : 500,
        transition: 'all 0.2s ease',
        textAlign: 'left'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Icon size={18} />
        {label}
      </div>
      {badge && (
        <span style={{ background: active ? 'var(--purple)' : 'var(--amber)', color: 'white', fontSize: '0.75rem', padding: '2px 8px', borderRadius: '10px', fontWeight: 700 }}>
          {badge}
        </span>
      )}
    </button>
  );
}

function MetricCard({ title, value, trend, isPositive, icon: Icon, iconColor }: { title: string, value: string, trend: string, isPositive: boolean, icon: any, iconColor: string }) {
  return (
    <div className="glass-card" style={{ flex: 1, padding: '20px', borderRadius: '20px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
        <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--muted)", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {title}
        </span>
        <div style={{ width: "24px", height: "24px", borderRadius: "6px", background: "rgba(108,29,95,0.05)", color: iconColor, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={14} />
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 'auto' }}>
        <strong style={{ fontSize: "2rem", fontWeight: 800, color: "var(--text)", lineHeight: 1 }}>{value}</strong>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: isPositive ? 'var(--emerald)' : 'var(--amber)', fontSize: '0.85rem', fontWeight: 600 }}>
          {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {trend}
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// VIEWS
// -------------------------------------------------------------

const revenueData = [
  { month: "Jan", collections: 4500000, payouts: 1200000 },
  { month: "Feb", collections: 5200000, payouts: 1400000 },
  { month: "Mar", collections: 4800000, payouts: 1500000 },
  { month: "Apr", collections: 6100000, payouts: 1600000 },
  { month: "May", collections: 5900000, payouts: 1800000 },
  { month: "Jun", collections: 7500000, payouts: 2100000 },
];

function RevenueAnalyticsView() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Collections & Payouts Over Time</h3>
        <select className="portal-input" style={{ width: '150px', background: 'transparent' }}>
          <option>Last 6 Months</option>
          <option>This Year</option>
          <option>All Time</option>
        </select>
      </div>

      <div style={{ flex: 1, minHeight: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--purple)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--purple)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: 'var(--muted)', fontSize: 12}} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--muted)', fontSize: 12}} tickFormatter={(v) => `₹${v/100000}L`} />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
              formatter={(value: any, name: any) => [`₹${value.toLocaleString()}`, name === 'collections' ? 'Fee Collections' : 'Trainer Payouts']}
            />
            <Area type="monotone" dataKey="collections" stroke="var(--purple)" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
            <Area type="monotone" dataKey="payouts" stroke="var(--amber)" strokeWidth={3} fillOpacity={0} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '24px' }}>
        <div style={{ border: '1px solid var(--line)', borderRadius: '16px', padding: '16px' }}>
           <h4 style={{ margin: '0 0 16px', color: 'var(--text-secondary)' }}>Collections by Program</h4>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
             <ProgressBar label="Enterprise React Track" percent={65} color="var(--purple)" amount="₹8,50,000" />
             <ProgressBar label="Product Design Bootcamp" percent={25} color="var(--emerald)" amount="₹3,25,000" />
             <ProgressBar label="Scrum Master Alpha" percent={10} color="var(--amber)" amount="₹1,30,000" />
           </div>
        </div>
        <div style={{ border: '1px solid var(--line)', borderRadius: '16px', padding: '16px' }}>
           <h4 style={{ margin: '0 0 16px', color: 'var(--text-secondary)' }}>Recent Fee Payments</h4>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <MiniTx user="Rajesh Kumar" desc="Enterprise React Track" amount="+₹45,000" />
              <MiniTx user="Sneha Sharma" desc="Product Design Bootcamp" amount="+₹30,000" />
              <MiniTx user="Amit Singh" desc="Scrum Master Alpha" amount="+₹25,000" />
           </div>
        </div>
      </div>
    </div>
  );
}

function ProgressBar({ label, percent, color, amount }: { label: string, percent: number, color: string, amount: string }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px', fontWeight: 500 }}>
        <span>{label}</span>
        <span>{amount}</span>
      </div>
      <div style={{ width: '100%', height: '8px', background: 'var(--line)', borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{ width: `${percent}%`, height: '100%', background: color, borderRadius: '4px' }} />
      </div>
    </div>
  );
}

function MiniTx({ user, desc, amount }: { user: string, desc: string, amount: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--bg-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--purple)', fontWeight: 700, fontSize: '0.8rem' }}>
          {user.charAt(0)}
        </div>
        <div>
          <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{user}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{desc}</div>
        </div>
      </div>
      <div style={{ color: 'var(--emerald)', fontWeight: 700, fontSize: '0.9rem' }}>{amount}</div>
    </div>
  );
}

// -------------------------------------------------------------
// DATA TABLES
// -------------------------------------------------------------

function TableView({ config, data }: { config: any, data: any[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{config.title}</h3>
        <div style={{ display: 'flex', gap: '12px' }}>
          <label className="portal-search" style={{ width: '250px' }}>
            <Search size={16} />
            <input placeholder="Search..." />
          </label>
          <button className="outline-btn" style={{ padding: '8px 12px' }}><Filter size={16} /> Filter</button>
        </div>
      </div>

      <div className="portal-table-wrapper" style={{ margin: 0, flex: 1 }}>
        <table className="portal-table">
          <thead>
            <tr>
              {config.columns.map((col: any) => <th key={col.key} style={col.align === 'right' ? {textAlign: 'right'} : {}}>{col.label}</th>)}
              <th style={{ width: '50px' }}></th>
            </tr>
          </thead>
          <tbody>
            {data.map((row: any, idx) => (
              <tr key={idx}>
                {config.columns.map((col: any) => (
                  <td key={col.key} style={col.align === 'right' ? {textAlign: 'right'} : {}}>
                    {col.render ? col.render(row) : <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{row[col.key]}</span>}
                  </td>
                ))}
                <td style={{ textAlign: 'right' }}>
                  <button className="ghost-btn" style={{ padding: '8px' }}><MoreVertical size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const renderStatus = (row: any) => (
  <span className={`status-chip ${row.status === 'Paid' || row.status === 'Active' || row.status === 'Completed' ? 'status-completed' : row.status === 'Pending' || row.status === 'Processing' ? 'status-ongoing' : row.status === 'Failed' || row.status === 'Overdue' ? 'status-missed' : 'status-upcoming'}`}>
    {row.status}
  </span>
);

const renderBold = (key: string) => (row: any) => (
  <div style={{ fontWeight: 600, color: 'var(--text)' }}>{row[key]}</div>
);
const renderCurrency = (key: string) => (row: any) => (
  <div style={{ fontWeight: 600, color: 'var(--text)', fontFamily: 'monospace', fontSize: '0.95rem' }}>{row[key]}</div>
);

const collectionsConfig = {
  title: "Fee Collections",
  columns: [
    { key: "id", label: "Receipt ID", render: (r:any) => <span style={{ fontFamily: 'monospace', color: 'var(--muted)', fontSize: '0.85rem' }}>{r.id}</span> },
    { key: "learner", label: "Learner Name", render: renderBold("learner") },
    { key: "course", label: "Course / Program" },
    { key: "date", label: "Date Paid" },
    { key: "method", label: "Method" },
    { key: "amount", label: "Amount", align: "right", render: renderCurrency("amount") },
    { key: "status", label: "Status", align: "right", render: renderStatus }
  ]
};

const collectionsData = [
  { id: "REC-90992", learner: "Rajesh Kumar", course: "Enterprise React Track", date: "08 Jul 2026", method: "UPI", amount: "₹45,000", status: "Paid" },
  { id: "REC-90991", learner: "Sneha Sharma", course: "Product Design Bootcamp", date: "08 Jul 2026", method: "Credit Card", amount: "₹30,000", status: "Paid" },
  { id: "REC-90990", learner: "Amit Singh", course: "Scrum Master Alpha", date: "07 Jul 2026", method: "Net Banking", amount: "₹25,000", status: "Failed" },
  { id: "REC-90989", learner: "Priya Patel", course: "Data Science Specialization", date: "05 Jul 2026", method: "UPI", amount: "₹55,000", status: "Paid" },
];

const payoutsConfig = {
  title: "Trainer Payouts",
  columns: [
    { key: "id", label: "Payout ID", render: (r:any) => <span style={{ fontFamily: 'monospace', color: 'var(--muted)', fontSize: '0.85rem' }}>{r.id}</span> },
    { key: "trainer", label: "Trainer Name", render: renderBold("trainer") },
    { key: "month", label: "Payout Month" },
    { key: "hours", label: "Billed Hours" },
    { key: "amount", label: "Amount", align: "right", render: renderCurrency("amount") },
    { key: "status", label: "Status", align: "right", render: renderStatus }
  ]
};

const payoutsData = [
  { id: "PAY-2026-06", trainer: "Dr. Kavya", month: "June 2026", hours: "42 hrs", amount: "₹1,25,000", status: "Processing" },
  { id: "PAY-2026-05", trainer: "Dr. Kavya", month: "May 2026", hours: "40 hrs", amount: "₹1,20,000", status: "Paid" },
  { id: "PAY-2026-06", trainer: "Prof. Sharma", month: "June 2026", hours: "35 hrs", amount: "₹1,05,000", status: "Processing" },
  { id: "PAY-2026-06", trainer: "Anil Desai", month: "June 2026", hours: "20 hrs", amount: "₹60,000", status: "Pending" },
];

const pendingConfig = {
  title: "Pending Fee Dues",
  columns: [
    { key: "inv", label: "Invoice #", render: (r:any) => <span style={{ fontFamily: 'monospace', color: 'var(--purple)', fontSize: '0.85rem', fontWeight: 600 }}>{r.inv}</span> },
    { key: "learner", label: "Learner Name", render: renderBold("learner") },
    { key: "course", label: "Course / Program" },
    { key: "dueDate", label: "Due Date" },
    { key: "amount", label: "Balance Due", align: "right", render: renderCurrency("amount") },
    { key: "status", label: "Status", align: "right", render: renderStatus }
  ]
};

const pendingData = [
  { inv: "INV-2026-104", learner: "Ravi Verma", course: "Enterprise React Track", dueDate: "01 Jul 2026", amount: "₹15,000", status: "Overdue" },
  { inv: "INV-2026-142", learner: "Neha Gupta", course: "Data Science Specialization", dueDate: "15 Jul 2026", amount: "₹20,000", status: "Pending" },
  { inv: "INV-2026-155", learner: "Kiran Rao", course: "Product Design Bootcamp", dueDate: "10 Jul 2026", amount: "₹10,000", status: "Pending" },
];

const courseFeesConfig = {
  title: "Course Fee Structures",
  columns: [
    { key: "course", label: "Course / Program", render: renderBold("course") },
    { key: "duration", label: "Duration" },
    { key: "fullPrice", label: "Full Price", align: "right", render: renderCurrency("fullPrice") },
    { key: "installment", label: "Installment Option", align: "right" },
    { key: "status", label: "Status", align: "right", render: renderStatus }
  ]
};

const courseFeesData = [
  { course: "Enterprise React Track", duration: "12 Weeks", fullPrice: "₹45,000", installment: "3 x ₹16,000", status: "Active" },
  { course: "Data Science Specialization", duration: "16 Weeks", fullPrice: "₹55,000", installment: "4 x ₹15,000", status: "Active" },
  { course: "Product Design Bootcamp", duration: "8 Weeks", fullPrice: "₹30,000", installment: "2 x ₹16,000", status: "Active" },
  { course: "Scrum Master Alpha", duration: "4 Weeks", fullPrice: "₹25,000", installment: "No", status: "Active" },
];

// -------------------------------------------------------------
// CREATION DRAWER
// -------------------------------------------------------------

function CreateTransactionDrawer({ onCancel }: { onCancel: () => void }) {
  return (
    <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '500px', background: 'var(--bg-panel)', boxShadow: '-10px 0 40px rgba(0,0,0,0.1)', zIndex: 100, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(20px)' }}>
        <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Log Transaction</h2>
        <button className="ghost-btn" onClick={onCancel} style={{ padding: '8px' }}><X size={20} /></button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
        <div className="wizard-form-grid" style={{ gridTemplateColumns: '1fr', gap: '20px' }}>
          <label className="form-group">
            <span>Transaction Type</span>
            <select className="portal-input">
              <option>Fee Collection (Income)</option>
              <option>Trainer Payout (Expense)</option>
            </select>
          </label>
          <label className="form-group">
            <span>Name (Learner / Trainer)</span>
            <input type="text" className="portal-input" placeholder="e.g. Rajesh Kumar" />
          </label>
          <label className="form-group">
            <span>Amount (₹)</span>
            <input type="number" className="portal-input" placeholder="0" />
          </label>
          <label className="form-group">
            <span>Payment Method</span>
            <select className="portal-input">
              <option>UPI</option>
              <option>Net Banking</option>
              <option>Wire Transfer</option>
              <option>Cheque</option>
            </select>
          </label>
          <label className="form-group">
            <span>Date</span>
            <input type="date" className="portal-input" />
          </label>
          <label className="form-group">
            <span>Reference / Memo</span>
            <textarea className="portal-input" rows={3} placeholder="Optional notes..."></textarea>
          </label>
        </div>
      </div>

      <div style={{ padding: '24px 32px', borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'flex-end', gap: '12px', background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(20px)' }}>
        <button className="outline-btn" onClick={onCancel}>Cancel</button>
        <button className="gradient-btn" onClick={onCancel}>Log Transaction</button>
      </div>
    </div>
  );
}
