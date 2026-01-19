'use client'

import { useState } from 'react'
import { 
  Settings, 
  Globe, 
  Bell, 
  Shield, 
  Database,
  RefreshCw,
  Save,
  CheckCircle,
  ExternalLink,
  Key,
  Link as LinkIcon
} from 'lucide-react'
import { cn } from '@/lib/utils'

const integrations = [
  { 
    id: 'keyloop', 
    name: 'KeyLoop DMS', 
    description: 'Dealer Management System',
    status: 'connected',
    lastSync: '5 mins ago'
  },
  { 
    id: 'dubizzle', 
    name: 'Dubizzle API', 
    description: 'Marketplace integration',
    status: 'connected',
    lastSync: '2 mins ago'
  },
  { 
    id: 'yallamotors', 
    name: 'YallaMotors API', 
    description: 'Marketplace integration',
    status: 'connected',
    lastSync: '3 mins ago'
  },
  { 
    id: 'zoho', 
    name: 'Zoho CRM', 
    description: 'Lead management',
    status: 'connected',
    lastSync: '1 min ago'
  },
  { 
    id: 'sap', 
    name: 'SAP ERP', 
    description: 'Enterprise resource planning',
    status: 'pending',
    lastSync: null
  },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general')
  const [saved, setSaved] = useState(false)
  
  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }
  
  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'integrations', label: 'Integrations', icon: LinkIcon },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
  ]
  
  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-sm border">
        {/* Tabs */}
        <div className="border-b">
          <div className="flex gap-1 p-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  activeTab === tab.id 
                    ? 'bg-primary text-white' 
                    : 'text-muted-foreground hover:bg-gray-100'
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">General Settings</h3>
                <div className="grid gap-4 max-w-xl">
                  <div>
                    <label className="block text-sm font-medium mb-2">Site Name</label>
                    <input 
                      type="text" 
                      defaultValue="Drive Life"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Site URL</label>
                    <input 
                      type="text" 
                      defaultValue="https://drivelife.ae"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Contact Email</label>
                    <input 
                      type="email" 
                      defaultValue="info@drivelife.ae"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Default Language</label>
                    <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                      <option>English</option>
                      <option>العربية (Arabic)</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 border-t">
                <h3 className="text-lg font-semibold mb-4">Publishing Defaults</h3>
                <div className="space-y-3 max-w-xl">
                  <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary focus:ring-primary" />
                    <div>
                      <p className="font-medium text-sm">Auto-publish to Website</p>
                      <p className="text-xs text-muted-foreground">Automatically publish approved listings to the main website</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                    <div>
                      <p className="font-medium text-sm">Auto-publish to Dubizzle</p>
                      <p className="text-xs text-muted-foreground">Automatically publish approved listings to Dubizzle</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                    <div>
                      <p className="font-medium text-sm">Auto-publish to YallaMotors</p>
                      <p className="text-xs text-muted-foreground">Automatically publish approved listings to YallaMotors</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'integrations' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">API Integrations</h3>
                  <p className="text-sm text-muted-foreground">Manage connections to external services</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm hover:bg-gray-50 transition-colors">
                  <RefreshCw className="w-4 h-4" />
                  Sync All
                </button>
              </div>
              
              <div className="space-y-4">
                {integrations.map(integration => (
                  <div 
                    key={integration.id}
                    className="flex items-center gap-4 p-4 border rounded-xl hover:shadow-sm transition-shadow"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                      <Database className="w-6 h-6 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{integration.name}</p>
                        {integration.status === 'connected' && (
                          <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                            Connected
                          </span>
                        )}
                        {integration.status === 'pending' && (
                          <span className="inline-flex items-center gap-1 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                            Pending Setup
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{integration.description}</p>
                      {integration.lastSync && (
                        <p className="text-xs text-muted-foreground mt-1">Last sync: {integration.lastSync}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Key className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <ExternalLink className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> This is a prototype. In production, each integration would have its own configuration panel with API keys, webhooks, and sync settings.
                </p>
              </div>
            </div>
          )}
          
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Notification Preferences</h3>
              <div className="space-y-4 max-w-xl">
                <div className="flex items-center justify-between p-4 border rounded-xl">
                  <div>
                    <p className="font-medium">New Listings</p>
                    <p className="text-sm text-muted-foreground">Get notified when new listings are submitted</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-xl">
                  <div>
                    <p className="font-medium">Sync Errors</p>
                    <p className="text-sm text-muted-foreground">Get notified when marketplace sync fails</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-xl">
                  <div>
                    <p className="font-medium">Lead Notifications</p>
                    <p className="text-sm text-muted-foreground">Get notified when new leads are captured</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-xl">
                  <div>
                    <p className="font-medium">Daily Summary</p>
                    <p className="text-sm text-muted-foreground">Receive daily email summary of activity</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Security Settings</h3>
              <div className="space-y-4 max-w-xl">
                <div className="p-4 border rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                    </div>
                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">Recommended</span>
                  </div>
                  <button className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50 transition-colors">
                    Enable 2FA
                  </button>
                </div>
                
                <div className="p-4 border rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-medium">Session Management</p>
                      <p className="text-sm text-muted-foreground">Manage active sessions</p>
                    </div>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">1 active</span>
                  </div>
                  <button className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50 transition-colors">
                    View Sessions
                  </button>
                </div>
                
                <div className="p-4 border rounded-xl">
                  <p className="font-medium mb-2">Change Password</p>
                  <div className="space-y-3">
                    <input 
                      type="password" 
                      placeholder="Current password"
                      className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <input 
                      type="password" 
                      placeholder="New password"
                      className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <input 
                      type="password" 
                      placeholder="Confirm new password"
                      className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary/90 transition-colors">
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                <p className="text-sm text-amber-800">
                  <strong>Prototype Note:</strong> Security features are visual mockups. In production, these would connect to your identity provider.
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Save Button */}
        <div className="px-6 py-4 border-t bg-gray-50 flex items-center justify-between rounded-b-xl">
          <p className="text-sm text-muted-foreground">Changes are saved automatically</p>
          <button 
            onClick={handleSave}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2',
              saved 
                ? 'bg-green-500 text-white'
                : 'bg-primary text-white hover:bg-primary/90'
            )}
          >
            {saved ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Saved!
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
