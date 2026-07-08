import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings, Building, Palette, Mail, Bell, Shield, Key, Database, Save, Upload
} from "lucide-react";

type SettingsTab = "General" | "Institution" | "Branding" | "Notifications" | "Security" | "API Config" | "Backups";

export function AdminSettingsModule() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("General");

  const tabs: { id: SettingsTab, icon: any, label: string }[] = [
    { id: "General", icon: Settings, label: "General Settings" },
    { id: "Institution", icon: Building, label: "Institution Profile" },
    { id: "Branding", icon: Palette, label: "Branding & UI" },
    { id: "Notifications", icon: Bell, label: "Notification Rules" },
    { id: "Security", icon: Shield, label: "Security & Auth" },
    { id: "API Config", icon: Key, label: "API Configuration" },
    { id: "Backups", icon: Database, label: "System Backups" },
  ];

  return (
    <div className="attendance-module-wrapper" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      
      {/* HEADER */}
      <div className="workspace-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
           <h2 className="module-title" style={{ margin: 0 }}>System Settings</h2>
           <p style={{ color: 'var(--muted)', marginTop: '8px' }}>Manage global configurations, security policies, and branding.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="gradient-btn"><Save size={16} /> Save Changes</button>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, gap: '24px', minHeight: 0 }}>
        
        {/* LEFT VERTICAL TABS */}
        <div className="glass-card" style={{ width: '280px', padding: '16px', borderRadius: '24px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {tabs.map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '12px 16px', borderRadius: '12px', border: 'none', cursor: 'pointer',
                background: activeTab === tab.id ? 'rgba(108, 29, 95, 0.08)' : 'transparent',
                color: activeTab === tab.id ? 'var(--purple)' : 'var(--text-secondary)',
                fontWeight: activeTab === tab.id ? 600 : 500,
                transition: 'all 0.2s ease',
                textAlign: 'left'
              }}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* RIGHT CONTENT AREA */}
        <div className="glass-card" style={{ flex: 1, padding: '32px', borderRadius: '24px', overflowY: 'auto' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
            >
              <h3 style={{ margin: '0 0 16px', fontSize: '1.25rem', borderBottom: '1px solid var(--line)', paddingBottom: '16px' }}>
                {activeTab} Configuration
              </h3>

              {activeTab === "General" && <GeneralSettings />}
              {activeTab === "Branding" && <BrandingSettings />}
              {activeTab === "Security" && <SecuritySettings />}
              {/* Fallback for others to keep it concise */}
              {["Institution", "Notifications", "API Config", "Backups"].includes(activeTab) && (
                <div style={{ padding: '40px', textAlign: 'center', color: 'var(--muted)' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--bg-soft)', color: 'var(--purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <Settings size={24} />
                  </div>
                  <p>Configuration panel for {activeTab} is currently under construction.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// SETTING PANELS
// -------------------------------------------------------------

function GeneralSettings() {
  return (
    <div className="wizard-form-grid" style={{ gridTemplateColumns: '1fr', gap: '20px', maxWidth: '600px' }}>
      <label className="form-group">
        <span>Platform Name</span>
        <input type="text" className="portal-input" defaultValue="Xebia Corporate LMS" />
      </label>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <label className="form-group">
          <span>Primary Language</span>
          <select className="portal-input">
            <option>English (US)</option>
            <option>English (UK)</option>
            <option>Hindi</option>
          </select>
        </label>
        <label className="form-group">
          <span>Timezone</span>
          <select className="portal-input">
            <option>Asia/Kolkata (IST)</option>
            <option>America/New_York (EST)</option>
            <option>Europe/London (GMT)</option>
          </select>
        </label>
      </div>
      <label className="form-group">
        <span>Default Currency</span>
        <select className="portal-input">
          <option>Indian Rupee (₹)</option>
          <option>US Dollar ($)</option>
          <option>Euro (€)</option>
        </select>
      </label>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: 'var(--bg-soft)', borderRadius: '12px', marginTop: '12px' }}>
        <input type="checkbox" id="maint" style={{ width: '18px', height: '18px', accentColor: 'var(--purple)' }} />
        <label htmlFor="maint" style={{ fontWeight: 600, cursor: 'pointer' }}>Enable Maintenance Mode</label>
        <span style={{ marginLeft: 'auto', fontSize: '0.85rem', color: 'var(--muted)' }}>Prevents non-admin logins</span>
      </div>
    </div>
  );
}

function BrandingSettings() {
  return (
    <div className="wizard-form-grid" style={{ gridTemplateColumns: '1fr', gap: '32px', maxWidth: '600px' }}>
      
      <div>
        <h4 style={{ margin: '0 0 16px', color: 'var(--text-secondary)' }}>Logos & Assets</h4>
        <div style={{ display: 'flex', gap: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
            <div style={{ width: '120px', height: '120px', border: '2px dashed var(--line)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-soft)' }}>
              <span style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text)' }}>Xebia</span>
            </div>
            <button className="outline-btn" style={{ padding: '6px 12px', fontSize: '0.85rem' }}><Upload size={14} /> Main Logo</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
            <div style={{ width: '120px', height: '120px', border: '2px dashed var(--line)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-soft)' }}>
              <span style={{ width: '40px', height: '40px', background: 'var(--purple)', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.2rem' }}>X</span>
            </div>
            <button className="outline-btn" style={{ padding: '6px 12px', fontSize: '0.85rem' }}><Upload size={14} /> Favicon</button>
          </div>
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 16px', color: 'var(--text-secondary)' }}>Color Palette</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <label className="form-group">
            <span>Primary Brand Color</span>
            <div style={{ display: 'flex', gap: '12px' }}>
              <input type="color" defaultValue="#6c1d5f" style={{ width: '40px', height: '40px', padding: 0, border: 'none', borderRadius: '8px', cursor: 'pointer' }} />
              <input type="text" className="portal-input" defaultValue="#6C1D5F" style={{ fontFamily: 'monospace' }} />
            </div>
          </label>
          <label className="form-group">
            <span>Secondary / Accent</span>
            <div style={{ display: 'flex', gap: '12px' }}>
              <input type="color" defaultValue="#f6e8f3" style={{ width: '40px', height: '40px', padding: 0, border: 'none', borderRadius: '8px', cursor: 'pointer' }} />
              <input type="text" className="portal-input" defaultValue="#F6E8F3" style={{ fontFamily: 'monospace' }} />
            </div>
          </label>
        </div>
      </div>
      
    </div>
  );
}

function SecuritySettings() {
  return (
    <div className="wizard-form-grid" style={{ gridTemplateColumns: '1fr', gap: '20px', maxWidth: '600px' }}>
      
      <div style={{ padding: '20px', border: '1px solid var(--line)', borderRadius: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
          <div>
            <h4 style={{ margin: '0 0 4px', fontSize: '1rem' }}>Two-Factor Authentication (2FA)</h4>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--muted)' }}>Require all administrative and trainer accounts to use 2FA.</p>
          </div>
          <div className="toggle-switch active"></div>
        </div>
      </div>

      <div style={{ padding: '20px', border: '1px solid var(--line)', borderRadius: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <h4 style={{ margin: '0 0 4px', fontSize: '1rem' }}>Session Timeout</h4>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--muted)' }}>Automatically log users out after a period of inactivity.</p>
          </div>
        </div>
        <select className="portal-input" defaultValue="30 Minutes">
          <option>15 Minutes</option>
          <option>30 Minutes</option>
          <option>1 Hour</option>
          <option>4 Hours</option>
          <option>Never</option>
        </select>
      </div>

      <div style={{ padding: '20px', border: '1px solid var(--line)', borderRadius: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <h4 style={{ margin: '0 0 4px', fontSize: '1rem' }}>Password Policy</h4>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--muted)' }}>Enforce strict password complexity rules.</p>
          </div>
          <div className="toggle-switch active"></div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <input type="checkbox" defaultChecked /> Minimum 12 characters
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <input type="checkbox" defaultChecked /> Require uppercase, lowercase, numbers, and symbols
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <input type="checkbox" defaultChecked /> Prevent password reuse (last 5 passwords)
          </label>
        </div>
      </div>
      
    </div>
  );
}
