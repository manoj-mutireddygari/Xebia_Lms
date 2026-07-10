import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp, Users, Clock, Star, Download, Filter, ArrowUpRight, ArrowDownRight, Calendar
} from "lucide-react";
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, XAxis, YAxis, 
  BarChart, Bar, Cell, Legend
} from "recharts";

export function AdminAnalyticsModule() {
  const [timeRange, setTimeRange] = useState("Last 30 Days");

  return (
    <div className="attendance-module-wrapper" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      
      {/* HEADER */}
      <div className="workspace-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
           <h2 className="module-title" style={{ margin: 0 }}>Executive Analytics</h2>
           <p style={{ color: 'var(--muted)', marginTop: '8px' }}>Platform engagement, enrollment trends, and trainer utilization.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div className="portal-search" style={{ padding: '6px 12px', width: 'auto', gap: '8px' }}>
            <Calendar size={16} />
            <select 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
              style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--text)', fontSize: '0.9rem', fontWeight: 500 }}
            >
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Quarter</option>
              <option>Year to Date</option>
            </select>
          </div>
          <button className="outline-btn"><Filter size={16} /> Advanced Filters</button>
          <button className="gradient-btn"><Download size={16} /> Export Report</button>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', minHeight: 0, paddingRight: '4px' }}>
        
        {/* KPI ROW */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
          <MetricCard title="Active Learners" value="8,402" trend="+12.5%" isPositive={true} icon={Users} iconColor="var(--purple)" />
          <MetricCard title="Avg Completion Time" value="4.2 Wks" trend="-1.1 Wks" isPositive={true} icon={Clock} iconColor="var(--emerald)" />
          <MetricCard title="Trainer Utilization" value="84%" trend="+5.2%" isPositive={true} icon={TrendingUp} iconColor="var(--purple)" />
          <MetricCard title="Platform Satisfaction" value="4.8/5" trend="+0.1" isPositive={true} icon={Star} iconColor="var(--amber)" />
        </div>

        {/* MAIN CHART */}
        <div className="glass-card" style={{ padding: '24px', borderRadius: '24px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Platform Engagement Trends</h3>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', fontSize: '0.85rem', fontWeight: 500 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: 12, height: 12, borderRadius: 3, background: 'var(--purple)' }}/> Daily Logins</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: 12, height: 12, borderRadius: 3, background: 'var(--emerald)' }}/> Session Attendance</div>
            </div>
          </div>
          <div style={{ height: '350px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={engagementData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorLogins" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--purple)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--purple)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorAtt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--emerald)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--emerald)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: 'var(--muted)', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--muted)', fontSize: 12}} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                  formatter={(value: any, name: any) => [value, name === 'logins' ? 'Daily Logins' : 'Session Attendance']}
                />
                <Area type="monotone" dataKey="logins" stroke="var(--purple)" strokeWidth={3} fillOpacity={1} fill="url(#colorLogins)" />
                <Area type="monotone" dataKey="attendance" stroke="var(--emerald)" strokeWidth={3} fillOpacity={1} fill="url(#colorAtt)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SECONDARY ROW */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', paddingBottom: '24px' }}>
          
          {/* BAR CHART */}
          <div className="glass-card" style={{ padding: '24px', borderRadius: '24px' }}>
            <h3 style={{ margin: '0 0 24px', fontSize: '1.2rem' }}>Enrollments by Category</h3>
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} layout="vertical" margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(0,0,0,0.05)" />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: 'var(--muted)', fontSize: 12}} />
                  <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--text)', fontSize: 12, fontWeight: 500}} width={120} />
                  <RechartsTooltip cursor={{fill: 'var(--bg-soft)'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="learners" fill="var(--purple)" radius={[0, 6, 6, 0]}>
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? 'var(--purple)' : index === 1 ? 'var(--emerald)' : 'var(--amber)'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* PERFORMANCE MATRIX (HEAT MAP ALTERNATIVE) */}
          <div className="glass-card" style={{ padding: '24px', borderRadius: '24px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ margin: '0 0 24px', fontSize: '1.2rem' }}>Trainer Performance Matrix</h3>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <PerformanceRow name="Dr. Kavya" metric="4.9/5" label="Satisfaction" progress={98} color="var(--emerald)" />
              <PerformanceRow name="Anil Desai" metric="96%" label="Attendance Rate" progress={96} color="var(--purple)" />
              <PerformanceRow name="Prof. Sharma" metric="42 hrs" label="Billed (This Mo)" progress={85} color="var(--amber)" />
              <PerformanceRow name="Sneha Gupta" metric="4.7/5" label="Satisfaction" progress={94} color="var(--emerald)" />
              <PerformanceRow name="Rajesh Kumar" metric="92%" label="Attendance Rate" progress={92} color="var(--purple)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// COMPONENTS
// -------------------------------------------------------------

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

function PerformanceRow({ name, metric, label, progress, color }: { name: string, metric: string, label: string, progress: number, color: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{name}</div>
        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text)' }}>
          {metric} <span style={{ color: 'var(--muted)', fontWeight: 500, fontSize: '0.75rem', marginLeft: '4px' }}>{label}</span>
        </div>
      </div>
      <div style={{ width: '100%', height: '8px', background: 'var(--line)', borderRadius: '4px', overflow: 'hidden' }}>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ height: '100%', background: color, borderRadius: '4px' }} 
        />
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// MOCK DATA
// -------------------------------------------------------------
const engagementData = [
  { date: "01 Jul", logins: 4200, attendance: 2800 },
  { date: "02 Jul", logins: 4800, attendance: 3100 },
  { date: "03 Jul", logins: 5100, attendance: 3500 },
  { date: "04 Jul", logins: 4900, attendance: 3200 },
  { date: "05 Jul", logins: 5600, attendance: 4100 },
  { date: "06 Jul", logins: 6100, attendance: 4600 },
  { date: "07 Jul", logins: 6500, attendance: 4900 },
  { date: "08 Jul", logins: 7200, attendance: 5500 },
];
const categoryData = [
  { name: "Engineering", learners: 4500 },
  { name: "Design & UX", learners: 2100 },
  { name: "Agile & Mgmt", learners: 1800 },
  { name: "Data Science", learners: 1200 },
];
