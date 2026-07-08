import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserCircle, Bell, Shield, Monitor, Save, Globe, Moon
} from "lucide-react";

type SettingsTab = "Account" | "Notifications" | "Privacy" | "Display";

export function StudentSettingsModule() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("Account");

  const tabs: { id: SettingsTab, icon: any, label: string }[] = [
    { id: "Account", icon: UserCircle, label: "Account Settings" },
    { id: "Display", icon: Monitor, label: "Display Preferences" },
    { id: "Notifications", icon: Bell, label: "Notification Rules" },
    { id: "Privacy", icon: Shield, label: "Privacy & Security" },
  ];

  return (
    <div className="attendance-module-wrapper" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      
      {/* HEADER */}
      <div className="workspace-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
           <h2 className="module-title" style={{ margin: 0 }}>Learner Settings</h2>
           <p style={{ color: 'var(--muted)', marginTop: '8px' }}>Manage your account, display preferences, and notifications.</p>
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

              {activeTab === "Display" && <DisplayPreferences />}
              {activeTab !== "Display" && (
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

function DisplayPreferences() {
  return (
    <div className="wizard-form-grid" style={{ gridTemplateColumns: '1fr', gap: '20px', maxWidth: '600px' }}>
      
      <div style={{ padding: '20px', border: '1px solid var(--line)', borderRadius: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h4 style={{ margin: '0 0 4px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Moon size={16} /> Dark Mode
            </h4>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--muted)' }}>Enable high-contrast dark theme for night studying.</p>
          </div>
          <div className="toggle-switch active"></div>
        </div>
      </div>

      <div style={{ padding: '20px', border: '1px solid var(--line)', borderRadius: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <h4 style={{ margin: '0 0 4px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Globe size={16} /> Content Language
            </h4>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--muted)' }}>Select your preferred language for learning materials.</p>
          </div>
        </div>
        <select className="portal-input" defaultValue="English">
          <option>English</option>
          <option>Hindi</option>
          <option>Spanish</option>
          <option>French</option>
        </select>
      </div>

      <div style={{ padding: '20px', border: '1px solid var(--line)', borderRadius: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <h4 style={{ margin: '0 0 4px', fontSize: '1rem' }}>Accessibility</h4>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--muted)' }}>Adjust display settings for better readability.</p>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <input type="checkbox" defaultChecked /> Enable animations & transitions
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <input type="checkbox" /> Large text mode
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <input type="checkbox" /> Reduce motion
          </label>
        </div>
      </div>

    </div>
  );
}
