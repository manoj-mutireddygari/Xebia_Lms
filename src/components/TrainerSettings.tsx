import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserCircle, Bell, Shield, Video, Save
} from "lucide-react";

type SettingsTab = "Account" | "Notifications" | "Privacy" | "Session Defaults";

export function TrainerSettingsModule() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("Account");

  const tabs: { id: SettingsTab, icon: any, label: string }[] = [
    { id: "Account", icon: UserCircle, label: "Account Settings" },
    { id: "Session Defaults", icon: Video, label: "Session Defaults" },
    { id: "Notifications", icon: Bell, label: "Notification Rules" },
    { id: "Privacy", icon: Shield, label: "Privacy & Security" },
  ];

  return (
    <div className="attendance-module-wrapper" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      
      {/* HEADER */}
      <div className="workspace-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
           <h2 className="module-title" style={{ margin: 0 }}>Trainer Settings</h2>
           <p style={{ color: 'var(--muted)', marginTop: '8px' }}>Manage your account, session defaults, and preferences.</p>
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

              {activeTab === "Session Defaults" && <SessionDefaults />}
              {activeTab !== "Session Defaults" && (
                <div style={{ padding: '40px', textAlign: 'center', color: 'var(--muted)' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--bg-soft)', color: 'var(--purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <UserCircle size={24} />
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

function SessionDefaults() {
  return (
    <div className="wizard-form-grid" style={{ gridTemplateColumns: '1fr', gap: '20px', maxWidth: '600px' }}>
      <label className="form-group">
        <span>Default Video Conferencing Tool</span>
        <select className="portal-input">
          <option>Zoom</option>
          <option>Microsoft Teams</option>
          <option>Google Meet</option>
        </select>
      </label>
      <label className="form-group">
        <span>Personal Meeting Link (Optional)</span>
        <input type="text" className="portal-input" defaultValue="https://zoom.us/j/1234567890" />
      </label>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
        <h4 style={{ margin: '0 0 8px', fontSize: '0.9rem' }}>Meeting Preferences</h4>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          <input type="checkbox" defaultChecked /> Auto-record all sessions to cloud
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          <input type="checkbox" defaultChecked /> Mute participants upon entry
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          <input type="checkbox" /> Require authentication to join
        </label>
      </div>
    </div>
  );
}
