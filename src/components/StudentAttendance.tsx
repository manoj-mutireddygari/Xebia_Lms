import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, CheckCircle, AlertCircle, Clock, QrCode, ArrowRight, X, Scan, Check
} from "lucide-react";

export function StudentAttendanceModule() {
  const [view, setView] = useState<"dashboard" | "scanner" | "success" | "error">("dashboard");

  return (
    <div className="attendance-module-wrapper">
      <AnimatePresence mode="wait">
        {view === "dashboard" && (
          <motion.div key="dashboard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            <StudentAttendanceDashboard onJoin={() => setView("scanner")} />
          </motion.div>
        )}
        {view === "scanner" && (
          <motion.div key="scanner" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.3 }}>
            <QRScannerScreen onCancel={() => setView("dashboard")} onSuccess={() => setView("success")} onError={() => setView("error")} />
          </motion.div>
        )}
        {view === "success" && (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ type: "spring", bounce: 0.5 }}>
            <AttendanceSuccessScreen onDone={() => setView("dashboard")} />
          </motion.div>
        )}
        {view === "error" && (
          <motion.div key="error" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ type: "spring", bounce: 0.5 }}>
            <AttendanceErrorScreen onRetry={() => setView("scanner")} onCancel={() => setView("dashboard")} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StudentAttendanceDashboard({ onJoin }: { onJoin: () => void }) {
  return (
    <div className="portal-grid">
      <section className="welcome-card hero-banner-card span-2" style={{ minHeight: 'auto', padding: '30px 40px' }}>
        <div className="hero-banner-left">
          <p className="hero-eyebrow">My Attendance</p>
          <h2 className="hero-title" style={{ fontSize: '2rem' }}>Attendance History</h2>
          <p className="hero-subtitle">You are maintaining a strong attendance record this semester. Keep it up!</p>
        </div>
        <div className="hero-banner-right" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--emerald)' }}>94%</div>
            <div style={{ fontWeight: 600, color: 'var(--muted)' }}>Overall Attendance</div>
          </div>
        </div>
      </section>

      <PortalPanel title="Today's Active Session" className="span-2">
        <div className="active-session-card glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', border: '1px solid var(--purple)' }}>
          <div>
            <div className="live-badge" style={{ marginBottom: '8px' }}><span className="pulse-dot"></span> Active Now</div>
            <h3 style={{ margin: '0 0 4px', fontSize: '1.2rem' }}>AI Systems</h3>
            <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.9rem' }}>Dr. Kavya Iyer • Lab 4</p>
          </div>
          <button className="gradient-btn" onClick={onJoin} style={{ padding: '0 24px', height: '48px', fontSize: '1rem' }}>
            <Scan size={20} />
            <span>Join Attendance</span>
          </button>
        </div>
      </PortalPanel>

      <PortalPanel title="Recent History" className="span-2">
        <div className="timetable-list">
          {["Cloud Architecture", "Secure APIs", "Data Engineering"].map((sub, i) => (
            <article className="timetable-row" key={i}>
              <div className="timetable-date-badge">
                <span className="date-day">{`0${7 - i}`}</span>
                <span className="date-month">Jul</span>
              </div>
              <div className="timetable-details" style={{ flex: 1 }}>
                <strong className="timetable-subject">{sub}</strong>
                <span className="timetable-faculty">{10 - i}:00 AM • Prof. {['Daniel Shah', 'Meera Nair', 'Arjun Menon'][i]}</span>
              </div>
              <div className="timetable-status">
                <span className="status-chip status-completed" style={{ background: i === 2 ? '#ffebee' : undefined, color: i === 2 ? '#d32f2f' : undefined }}>
                  {i === 2 ? 'Absent' : 'Present'}
                </span>
              </div>
            </article>
          ))}
        </div>
      </PortalPanel>
    </div>
  );
}

function QRScannerScreen({ onCancel, onSuccess, onError }: { onCancel: () => void, onSuccess: () => void, onError: () => void }) {
  useEffect(() => {
    // Simulate successful scan after 3.5 seconds
    const timer = setTimeout(() => {
      onSuccess();
    }, 3500);
    return () => clearTimeout(timer);
  }, [onSuccess]);

  return (
    <div className="qr-scanner-overlay">
      <div className="qr-scanner-header">
        <h2>Mark Attendance</h2>
        <button className="ghost-btn" onClick={onCancel} style={{ color: 'white' }}><X size={24} /></button>
      </div>
      <div className="qr-scanner-body">
        <p style={{ color: 'white', marginBottom: '40px', fontSize: '1.1rem', textAlign: 'center' }}>Align the QR code within the frame</p>
        <div className="scanner-frame-wrapper">
          <div className="scanner-frame">
            <div className="scanner-corner top-left"></div>
            <div className="scanner-corner top-right"></div>
            <div className="scanner-corner bottom-left"></div>
            <div className="scanner-corner bottom-right"></div>
            <motion.div 
              className="scanner-laser"
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function AttendanceSuccessScreen({ onDone }: { onDone: () => void }) {
  return (
    <div className="attendance-feedback-screen glass-card">
      <motion.div 
        initial={{ scale: 0 }} 
        animate={{ scale: 1 }} 
        transition={{ type: "spring", bounce: 0.6, delay: 0.1 }}
        className="success-icon-wrapper"
      >
        <Check size={64} />
      </motion.div>
      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        Attendance Marked!
      </motion.h2>
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ color: 'var(--muted)', marginBottom: '32px' }}>
        You have successfully marked your attendance for <strong>AI Systems</strong>.
      </motion.p>
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="feedback-details-box">
        <div className="detail-row"><span>Date</span><strong>08 Jul 2026</strong></div>
        <div className="detail-row"><span>Time</span><strong>10:04 AM</strong></div>
        <div className="detail-row"><span>Location</span><strong>Lab 4</strong></div>
      </motion.div>

      <motion.button 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
        className="gradient-btn large" onClick={onDone} style={{ width: '100%', marginTop: '32px' }}
      >
        Back to Dashboard
      </motion.button>
    </div>
  );
}

function AttendanceErrorScreen({ onRetry, onCancel }: { onRetry: () => void, onCancel: () => void }) {
  return (
    <div className="attendance-feedback-screen glass-card">
      <motion.div 
        initial={{ scale: 0 }} 
        animate={{ scale: 1 }} 
        transition={{ type: "spring", bounce: 0.6, delay: 0.1 }}
        className="error-icon-wrapper"
      >
        <AlertCircle size={64} />
      </motion.div>
      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        Invalid QR Code
      </motion.h2>
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ color: 'var(--muted)', marginBottom: '32px' }}>
        This QR code has expired or is not valid for this session. Please ask your trainer to generate a new code.
      </motion.p>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} style={{ display: 'flex', gap: '12px', width: '100%' }}>
        <button className="outline-btn large" onClick={onCancel} style={{ flex: 1 }}>Cancel</button>
        <button className="gradient-btn large" onClick={onRetry} style={{ flex: 1 }}>Try Again</button>
      </motion.div>
    </div>
  );
}

function PortalPanel({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`portal-panel glass-card ${className}`}>
      <div className="portal-panel-head">
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  );
}
