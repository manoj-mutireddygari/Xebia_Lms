import React, { useState, useEffect } from "react";
import {
  Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer
} from "recharts";
import {
  ClipboardCheck, Clock, CheckCircle, AlertCircle, Search, 
  UsersRound, PlayCircle, Download, FileText, 
  QrCode, PauseCircle, StopCircle, RefreshCw, X, ArrowRight, Filter, Target, Calendar
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const mockTrendData = [
  { day: "Mon", attendance: 85 },
  { day: "Tue", attendance: 92 },
  { day: "Wed", attendance: 88 },
  { day: "Thu", attendance: 95 },
  { day: "Fri", attendance: 90 },
];

export function TrainerAttendanceModule() {
  const [view, setView] = useState<"dashboard" | "wizard" | "live" | "analytics">("dashboard");

  return (
    <div className="attendance-module-wrapper">
      <AnimatePresence mode="wait">
        {view === "dashboard" && (
          <motion.div key="dashboard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            <AttendanceDashboard onStartWizard={() => setView("wizard")} onOpenAnalytics={() => setView("analytics")} />
          </motion.div>
        )}
        {view === "wizard" && (
          <motion.div key="wizard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            <AttendanceWizard onCancel={() => setView("dashboard")} onStartSession={() => setView("live")} />
          </motion.div>
        )}
        {view === "live" && (
          <motion.div key="live" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} transition={{ duration: 0.3 }}>
            <LiveSession onClose={() => setView("analytics")} />
          </motion.div>
        )}
        {view === "analytics" && (
          <motion.div key="analytics" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            <AttendanceAnalytics onBack={() => setView("dashboard")} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AttendanceDashboard({ onStartWizard, onOpenAnalytics }: { onStartWizard: () => void, onOpenAnalytics: () => void }) {
  return (
    <div className="portal-grid">
      <section className="welcome-card hero-banner-card" style={{ gridColumn: 'span 4', minHeight: 'auto', padding: '40px', background: 'linear-gradient(90deg, #FFFFFF 0%, #FDF8FE 40%, #E6D5E9 100%)', border: '1px solid rgba(108, 29, 95, 0.08)', boxShadow: '0 20px 50px rgba(108, 29, 95, 0.05)' }}>
        <div className="hero-banner-left">
          <p className="hero-eyebrow" style={{ letterSpacing: '1px', fontWeight: 800 }}>ATTENDANCE MANAGEMENT</p>
          <h2 className="hero-title" style={{ fontSize: '2.4rem', color: '#1A1A2E', marginTop: '4px' }}>Overview</h2>
          <p className="hero-subtitle" style={{ color: 'var(--muted)', fontSize: '1.05rem', maxWidth: '500px', margin: '8px 0 24px' }}>Track, manage, and analyze student attendance across all your active cohorts.</p>
          <div className="dashboard-top">
            <button className="gradient-btn" onClick={onStartWizard} style={{ padding: '0 24px', height: '48px' }}>
              <PlayCircle size={18} />
              <span>Start Session</span>
            </button>
            <button className="outline-btn" onClick={onOpenAnalytics} style={{ padding: '0 24px', height: '48px', background: 'white' }}>
              <FileText size={18} />
              <span>View Reports</span>
            </button>
          </div>
        </div>
        <div className="hero-banner-right" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <div style={{ background: 'linear-gradient(135deg, #6C1D5F, #4A1E47)', width: '130px', height: '130px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 24px 48px rgba(108,29,95,0.4)' }}>
             <QrCode size={54} strokeWidth={1.5} />
          </div>
        </div>
      </section>

      <div style={{ gridColumn: 'span 4', display: 'flex', gap: '24px', alignItems: 'stretch' }}>
        <div style={{ display: 'flex', gap: '16px', flex: 1.1 }}>
          <MetricPill title={<>Today's<br/>Sessions</>} value="03" text={<>1 completed,<br/>2 upcoming</>} icon={Calendar} iconColor="var(--purple)" />
          <MetricPill title={<>Avg<br/>Attendance</>} value="88%" text={<>+2% from<br/>last week</>} icon={Target} iconColor="var(--emerald)" />
          <MetricPill title={<>Students<br/>Absent</>} value="14" text={<>Requires<br/>intervention</>} icon={AlertCircle} iconColor="var(--purple)" />
          <MetricPill title={<>Pending<br/>Review</>} value="02" text={<>Manual<br/>attendance requests</>} icon={CheckCircle} iconColor="var(--emerald)" />
        </div>

        <PortalPanel title="Recent Sessions" style={{ flex: 1, margin: 0 }}>
          <div className="timetable-list" style={{ gap: '12px' }}>
            {["AI Systems - Cohort A", "Cloud Architecture - Cohort B", "Secure APIs"].map((sub, i) => (
              <article className="timetable-row" key={i} style={{ padding: '12px 16px', borderRadius: '16px' }}>
                <div className="timetable-date-badge" style={{ padding: '6px' }}>
                  <span className="date-day">{`0${8 - i}`}</span>
                  <span className="date-month">Jul</span>
                </div>
                <div className="timetable-details" style={{ flex: 1, minWidth: '120px' }}>
                  <strong className="timetable-subject" style={{ fontSize: '0.9rem' }}>{sub}</strong>
                  <span className="timetable-faculty" style={{ fontSize: '0.8rem' }}>Lab {i + 1} • {10 - i}:00 AM</span>
                </div>
                <div className="timetable-location" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', flex: 0.8 }}>
                   <div className="course-progress-wrapper" style={{ margin: 0, width: '100%' }}>
                      <div className="course-progress-bar-bg" style={{ width: '100%', height: '6px' }}>
                        <div className="course-progress-bar-fill" style={{ width: `${90 - i * 5}%`, background: 'var(--emerald)' }}></div>
                      </div>
                    </div>
                    <span className="course-progress-text" style={{ fontSize: '0.75rem', fontWeight: 700 }}>{90 - i * 5}% Present</span>
                </div>
                <div className="timetable-status" style={{ marginLeft: '12px' }}>
                  <button className="ghost-btn" onClick={onOpenAnalytics} style={{ padding: '4px 8px', fontSize: '0.8rem', fontWeight: 800 }}>Details</button>
                </div>
              </article>
            ))}
          </div>
        </PortalPanel>
      </div>
    </div>
  );
}

function AttendanceWizard({ onCancel, onStartSession }: { onCancel: () => void, onStartSession: () => void }) {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(s => Math.min(4, s + 1));
  const prevStep = () => setStep(s => Math.max(1, s - 1));

  return (
    <div className="wizard-container glass-card">
      <div className="wizard-header">
        <button className="ghost-btn" onClick={onCancel} style={{ padding: '8px' }}><X size={20} /></button>
        <h2>Create Attendance Session</h2>
        <div className="wizard-steps-indicator">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className={`wizard-step-dot ${step >= s ? 'active' : ''}`} />
          ))}
        </div>
      </div>
      
      <div className="wizard-body">
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h3>Step 1: Course Selection</h3>
            <div className="wizard-form-grid">
              <label className="form-group">
                <span>Course</span>
                <select className="portal-input"><option>AI Systems</option><option>Cloud Architecture</option></select>
              </label>
              <label className="form-group">
                <span>Batch</span>
                <select className="portal-input"><option>Cohort A (42 Students)</option><option>Cohort B (38 Students)</option></select>
              </label>
              <label className="form-group">
                <span>Subject / Topic</span>
                <input type="text" className="portal-input" placeholder="e.g. Intro to Neural Networks" />
              </label>
            </div>
          </motion.div>
        )}
        
        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h3>Step 2: Session Details</h3>
            <div className="wizard-form-grid">
               <label className="form-group">
                <span>Date</span>
                <input type="date" className="portal-input" defaultValue="2026-07-08" />
              </label>
              <div style={{ display: 'flex', gap: '12px' }}>
                <label className="form-group" style={{ flex: 1 }}>
                  <span>Start Time</span>
                  <input type="time" className="portal-input" defaultValue="10:00" />
                </label>
                <label className="form-group" style={{ flex: 1 }}>
                  <span>Duration (mins)</span>
                  <input type="number" className="portal-input" defaultValue={90} />
                </label>
              </div>
              <label className="form-group">
                <span>Room Number (Optional)</span>
                <input type="text" className="portal-input" placeholder="Lab 4" />
              </label>
              <label className="form-group span-2">
                <span>Notes for Students</span>
                <textarea className="portal-input" placeholder="Bring your laptops..." rows={2}></textarea>
              </label>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3>Step 3: Student Selection</h3>
              <span className="badge">42 Students Selected</span>
            </div>
            <div className="student-select-list">
              <label className="portal-search" style={{ marginBottom: '12px', width: '100%' }}>
                <Search size={16} />
                <input placeholder="Search students by name or ID..." />
              </label>
              <div className="student-list-scrollable" style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid var(--line)', borderRadius: '12px' }}>
                {[1,2,3,4,5].map(i => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderBottom: '1px solid var(--line)' }}>
                    <input type="checkbox" defaultChecked />
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--parplight)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>
                      S{i}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Student Name {i}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>student{i}@xebia.com</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h3>Step 4: Email Preview</h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '16px' }}>Students will receive this invitation to join the attendance session.</p>
            <div className="email-preview-card">
              <div className="email-header">
                <img src="/logo-purple.png" alt="Xebia" style={{ height: '24px' }} />
                <span>Attendance Invitation</span>
              </div>
              <div className="email-body">
                <h4>Hi Student,</h4>
                <p>You have been invited to an attendance session for <strong>AI Systems</strong> by Dr. Kavya Iyer.</p>
                <div className="email-details-box">
                  <div><strong>Date:</strong> 08 Jul 2026</div>
                  <div><strong>Time:</strong> 10:00 AM</div>
                  <div><strong>Room:</strong> Lab 4</div>
                </div>
                <button className="gradient-btn" style={{ marginTop: '16px', width: '100%', pointerEvents: 'none' }}>Join Attendance</button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="wizard-footer">
        <button className="outline-btn" onClick={step === 1 ? onCancel : prevStep}>
          {step === 1 ? 'Cancel' : 'Back'}
        </button>
        <button className="gradient-btn" onClick={step === 4 ? onStartSession : nextStep}>
          <span>{step === 4 ? 'Send Invites & Start' : 'Next Step'}</span>
          {step !== 4 && <ArrowRight size={16} />}
        </button>
      </div>
    </div>
  );
}

function LiveSession({ onClose }: { onClose: () => void }) {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const timeString = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  return (
    <div className="live-session-wrapper">
      <div className="live-header glass-card">
        <div>
          <div className="live-badge"><span className="pulse-dot"></span> Live Session</div>
          <h2 style={{ margin: '8px 0 4px' }}>AI Systems - Cohort A</h2>
          <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.9rem' }}>Lab 4 • Started at 10:00 AM</p>
        </div>
        <div className="live-actions">
          <button className="outline-btn"><PauseCircle size={18} /> Pause</button>
          <button className="danger-btn" onClick={onClose} style={{ background: '#ffebee', color: '#d32f2f', border: '1px solid #ffcdd2', padding: '0 16px', borderRadius: '999px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
            <StopCircle size={18} /> End Session
          </button>
        </div>
      </div>

      <div className="live-grid">
        <div className="qr-panel glass-card">
          <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Scan to Mark Attendance</h3>
          
          <div className={`qr-display ${timeLeft === 0 ? 'expired' : ''}`}>
             {timeLeft > 0 ? (
                <div className="qr-placeholder">
                  <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="qr" width="20" height="20" patternUnits="userSpaceOnUse">
                        <rect width="10" height="10" fill="var(--purple)" />
                        <rect x="10" y="10" width="10" height="10" fill="var(--purple)" />
                        <rect x="10" width="10" height="10" fill="var(--lavender)" />
                        <rect y="10" width="10" height="10" fill="var(--lavender)" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#qr)" />
                    <rect x="10" y="10" width="40" height="40" fill="white" />
                    <rect x="150" y="10" width="40" height="40" fill="white" />
                    <rect x="10" y="150" width="40" height="40" fill="white" />
                    <rect x="15" y="15" width="30" height="30" fill="none" stroke="var(--purple)" strokeWidth="6" />
                    <rect x="155" y="15" width="30" height="30" fill="none" stroke="var(--purple)" strokeWidth="6" />
                    <rect x="15" y="155" width="30" height="30" fill="none" stroke="var(--purple)" strokeWidth="6" />
                  </svg>
                </div>
             ) : (
                <div className="qr-expired-msg">
                  <AlertCircle size={48} color="var(--muted)" />
                  <h4>Session Expired</h4>
                  <button className="outline-btn" onClick={() => setTimeLeft(600)}><RefreshCw size={16} /> Generate New QR</button>
                </div>
             )}
          </div>

          <div className="timer-box" style={{ background: timeLeft < 60 ? '#ffebee' : 'var(--bg-soft)', color: timeLeft < 60 ? '#d32f2f' : 'inherit' }}>
            <Clock size={20} />
            <span className="timer-text">{timeString}</span>
            <span className="timer-label">Remaining</span>
          </div>
          
          <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--muted)', marginTop: '16px' }}>QR code automatically expires after 10 minutes to prevent proxy attendance.</p>
        </div>

        <div className="live-stats-panel">
           <div className="live-stat-cards">
             <div className="live-stat glass-card" style={{ borderLeft: '4px solid var(--emerald)' }}>
               <span className="stat-val">38</span>
               <span className="stat-lbl">Present</span>
             </div>
             <div className="live-stat glass-card" style={{ borderLeft: '4px solid #d32f2f' }}>
               <span className="stat-val">4</span>
               <span className="stat-lbl">Absent</span>
             </div>
             <div className="live-stat glass-card" style={{ borderLeft: '4px solid var(--amber)' }}>
               <span className="stat-val">0</span>
               <span className="stat-lbl">Late</span>
             </div>
           </div>

           <div className="live-table-card glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0 }}>Live Roster</h3>
                <label className="portal-search" style={{ minHeight: '36px' }}>
                  <Search size={14} />
                  <input placeholder="Search..." style={{ fontSize: '0.85rem' }} />
                </label>
              </div>
              <div className="roster-table-container">
                <table className="roster-table">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Time</th>
                      <th>Status</th>
                      <th>Device</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div className="avatar-sm">M</div>
                          <div>
                            <div style={{ fontWeight: 600 }}>Meera Srinivas</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>XLM-24018</div>
                          </div>
                        </div>
                      </td>
                      <td>10:02 AM</td>
                      <td><span className="status-chip status-completed">Present</span></td>
                      <td><span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>iOS Safari</span></td>
                    </tr>
                    <tr>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div className="avatar-sm" style={{ background: '#ffebee', color: '#d32f2f' }}>A</div>
                          <div>
                            <div style={{ fontWeight: 600 }}>Arjun Patel</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>XLM-24019</div>
                          </div>
                        </div>
                      </td>
                      <td>--:--</td>
                      <td><span className="status-chip status-upcoming" style={{ background: '#ffebee', color: '#d32f2f' }}>Absent</span></td>
                      <td>-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function AttendanceAnalytics({ onBack }: { onBack: () => void }) {
  return (
    <div className="portal-grid">
      <div className="workspace-header" style={{ gridColumn: 'span 4', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 0 }}>
        <div>
           <button className="ghost-btn" onClick={onBack} style={{ padding: 0, marginBottom: '8px' }}><ArrowRight size={16} style={{ transform: 'rotate(180deg)', marginRight: '4px' }} /> Back to Dashboard</button>
           <h2 className="module-title" style={{ margin: 0 }}>Attendance Analytics</h2>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="outline-btn"><Filter size={16} /> Filter</button>
          <button className="gradient-btn"><Download size={16} /> Export PDF</button>
        </div>
      </div>

      <div style={{ gridColumn: 'span 4', display: 'flex', gap: '16px' }}>
        <MetricPill title={<>Overall<br/>Attendance</>} value="92%" text={<>Across all<br/>cohorts</>} icon={Target} iconColor="var(--emerald)" />
        <MetricPill title={<>Sessions<br/>Conducted</>} value="48" text={<>This<br/>semester</>} icon={Calendar} iconColor="var(--purple)" />
        <MetricPill title={<>Consistent<br/>Attendees</>} value="85%" text={<>&gt; 80%<br/>attendance</>} icon={UsersRound} iconColor="var(--emerald)" />
        <MetricPill title={<>At Risk<br/>Students</>} value="12" text={<>&lt; 75%<br/>attendance</>} icon={AlertCircle} iconColor="var(--purple)" />
      </div>

      <PortalPanel title="Attendance Trend (This Week)" className="span-2">
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={mockTrendData} margin={{ left: -20, right: 10, top: 10, bottom: 0 }}>
             <defs>
              <linearGradient id="areaGradTrend" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6C1D5F" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6C1D5F" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(108, 29, 95, 0.05)" vertical={false} />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#5A5A5A' }} />
            <YAxis hide domain={[0, 100]} />
            <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
            <Area type="monotone" dataKey="attendance" stroke="#6C1D5F" strokeWidth={3} fill="url(#areaGradTrend)" />
          </AreaChart>
        </ResponsiveContainer>
      </PortalPanel>

      <PortalPanel title="Course-wise Performance" className="span-2">
         <div className="timetable-list">
          {["AI Systems", "Cloud Architecture", "Secure APIs", "Data Engineering"].map((sub, i) => (
             <article className="timetable-row" key={i}>
              <div className="timetable-details" style={{ flex: 1 }}>
                <strong className="timetable-subject">{sub}</strong>
                <span className="timetable-faculty">{40 + i * 2} Students</span>
              </div>
              <div className="timetable-location" style={{ flex: 2 }}>
                 <div className="course-progress-wrapper" style={{ margin: 0, width: '100%' }}>
                    <div className="course-progress-bar-bg" style={{ flex: 1 }}>
                      <div className="course-progress-bar-fill" style={{ width: `${95 - i * 4}%`, background: i > 2 ? 'var(--amber)' : 'var(--emerald)' }}></div>
                    </div>
                    <span className="course-progress-text" style={{ width: '80px', textAlign: 'right' }}>{95 - i * 4}% Avg</span>
                  </div>
              </div>
            </article>
          ))}
         </div>
      </PortalPanel>
    </div>
  );
}

function PortalPanel({ title, children, className = "", style }: { title: string; children: React.ReactNode; className?: string, style?: React.CSSProperties }) {
  return (
    <section className={`portal-panel glass-card ${className}`} style={style}>
      <div className="portal-panel-head">
        <h2>{title}</h2>
      </div>
      {children}
    </section>
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
