import React from "react";
import { motion } from "framer-motion";
import {
  User, Mail, Phone, MapPin, Camera, Key, CheckCircle, Activity, Globe, Moon, BookOpen, Award
} from "lucide-react";

export function StudentProfileModule() {
  return (
    <div className="attendance-module-wrapper" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      
      {/* HEADER BANNER */}
      <div className="glass-card" style={{ padding: '32px', borderRadius: '24px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '32px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '80px', background: 'var(--gradient-brand)', opacity: 0.8 }} />
        
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'flex-end', gap: '32px', width: '100%', marginTop: '30px' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'var(--bg-panel)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', fontWeight: 900, color: 'var(--purple)', border: '4px solid var(--bg)', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
              <img src="https://ui-avatars.com/api/?name=Sneha+Sharma&background=f6e8f3&color=6c1d5f&size=120" alt="Student" style={{ borderRadius: '50%' }} />
            </div>
            <button className="gradient-btn" style={{ position: 'absolute', bottom: 0, right: 0, width: '36px', height: '36px', padding: 0, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Camera size={16} />
            </button>
          </div>
          
          <div style={{ flex: 1, paddingBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
              <h1 style={{ margin: 0, fontSize: '2rem', color: 'var(--text)' }}>Sneha Sharma</h1>
              <span className="status-chip status-completed" style={{ padding: '4px 10px' }}><CheckCircle size={14} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '4px' }}/> Active Learner</span>
            </div>
            <p style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-secondary)' }}>Cohort: Product Design Bootcamp • ID ST-8821</p>
          </div>
          
          <div style={{ paddingBottom: '10px' }}>
             <button className="outline-btn"><Key size={16} /> Change Password</button>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, gap: '24px', minHeight: 0 }}>
        
        {/* LEFT COLUMN: PERSONAL INFO */}
        <div className="glass-card" style={{ flex: 2, padding: '32px', borderRadius: '24px', overflowY: 'auto' }}>
          <h3 style={{ margin: '0 0 24px', fontSize: '1.25rem', borderBottom: '1px solid var(--line)', paddingBottom: '16px' }}>Personal Information</h3>
          
          <div className="wizard-form-grid" style={{ gap: '24px' }}>
            <label className="form-group">
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><User size={16} /> Full Name</span>
              <input type="text" className="portal-input" defaultValue="Sneha Sharma" />
            </label>
            <label className="form-group">
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Mail size={16} /> Email Address</span>
              <input type="email" className="portal-input" defaultValue="sneha@design.co" />
            </label>
            <label className="form-group">
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Phone size={16} /> Phone Number</span>
              <input type="tel" className="portal-input" defaultValue="+91 98888 77777" />
            </label>
            <label className="form-group">
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={16} /> Location</span>
              <input type="text" className="portal-input" defaultValue="Mumbai, India" />
            </label>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '32px' }}>
            <button className="gradient-btn">Update Profile</button>
          </div>
        </div>

        {/* RIGHT COLUMN: PREFS & ACTIVITY */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px', minWidth: '350px' }}>
          
          <div className="glass-card" style={{ padding: '24px', borderRadius: '24px', display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1, textAlign: 'center', padding: '16px', background: 'var(--bg-soft)', borderRadius: '16px' }}>
              <div style={{ color: 'var(--emerald)', marginBottom: '8px' }}><BookOpen size={24} style={{ margin: '0 auto' }}/></div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>12</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)', textTransform: 'uppercase' }}>Courses Finished</div>
            </div>
            <div style={{ flex: 1, textAlign: 'center', padding: '16px', background: 'var(--bg-soft)', borderRadius: '16px' }}>
              <div style={{ color: 'var(--purple)', marginBottom: '8px' }}><Award size={24} style={{ margin: '0 auto' }}/></div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>3</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)', textTransform: 'uppercase' }}>Certifications</div>
            </div>
          </div>
          
          <div className="glass-card" style={{ padding: '24px', borderRadius: '24px', flex: 1, overflowY: 'auto' }}>
            <h3 style={{ margin: '0 0 16px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={18} /> Recent Activity
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <ActivityItem action="Submitted Assignment 'UI Mocks'" time="2 hours ago" />
              <ActivityItem action="Attended 'Design Sprint Day 1'" time="Yesterday" />
              <ActivityItem action="Passed 'Figma Basics' Quiz" time="2 days ago" />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

function ActivityItem({ action, time }: { action: string, time: string }) {
  return (
    <div style={{ display: 'flex', gap: '12px', position: 'relative' }}>
      <div style={{ width: '1px', background: 'var(--line)', position: 'absolute', top: '24px', bottom: '-20px', left: '16px' }} />
      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--bg-soft)', color: 'var(--purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
        <Activity size={14} />
      </div>
      <div>
        <div style={{ fontSize: '0.9rem', color: 'var(--text)' }}>{action}</div>
        <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{time}</div>
      </div>
    </div>
  );
}
