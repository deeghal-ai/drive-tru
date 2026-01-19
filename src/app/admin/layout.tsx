'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  ClipboardCheck, 
  Globe, 
  Package, 
  Settings,
  Bell,
  User,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { 
    href: '/admin', 
    label: 'Dashboard', 
    icon: LayoutDashboard,
    exact: true 
  },
  { 
    href: '/admin/approvals', 
    label: 'Approval Queue', 
    icon: ClipboardCheck,
    badge: 5 
  },
  { 
    href: '/admin/publishing', 
    label: 'Publishing Center', 
    icon: Globe 
  },
  { 
    href: '/admin/inventory', 
    label: 'Inventory', 
    icon: Package 
  },
  { 
    href: '/admin/settings', 
    label: 'Settings', 
    icon: Settings 
  },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const isActive = (item: typeof navItems[0]) => {
    if (item.exact) {
      return pathname === item.href
    }
    return pathname.startsWith(item.href)
  }
  
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        'fixed lg:static inset-y-0 left-0 z-50 flex flex-col bg-slate-900 text-white transition-all duration-300',
        sidebarCollapsed ? 'w-20' : 'w-64',
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-700">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center font-bold text-sm">
                DL
              </div>
              <span className="font-semibold">Drive Life CMS</span>
            </div>
          )}
          {sidebarCollapsed && (
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center font-bold text-sm mx-auto">
              DL
            </div>
          )}
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden lg:flex p-1.5 hover:bg-slate-800 rounded-lg transition-colors"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden p-1.5 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative',
                isActive(item) 
                  ? 'bg-red-500/20 text-red-400 border-l-2 border-red-500 ml-0' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              )}
            >
              <item.icon className={cn(
                'w-5 h-5 flex-shrink-0',
                sidebarCollapsed && 'mx-auto'
              )} />
              {!sidebarCollapsed && (
                <>
                  <span className="font-medium">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
              {sidebarCollapsed && item.badge && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
              
              {/* Tooltip for collapsed sidebar */}
              {sidebarCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                  {item.label}
                  {item.badge && (
                    <span className="ml-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </Link>
          ))}
        </nav>
        
        {/* User section */}
        <div className="p-3 border-t border-slate-700">
          <div className={cn(
            'flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer',
            sidebarCollapsed && 'justify-center'
          )}>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
              QT
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Quality Team</p>
                <p className="text-xs text-slate-400 truncate">admin@drivelife.ae</p>
              </div>
            )}
          </div>
          
          {!sidebarCollapsed && (
            <button className="flex items-center gap-2 w-full mt-2 px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          )}
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            {/* Mobile menu toggle */}
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            {/* Breadcrumb / Page title */}
            <div>
              <p className="text-sm text-muted-foreground">Quality Control Dashboard</p>
              <h1 className="text-lg font-semibold capitalize">
                {pathname === '/admin' 
                  ? 'Dashboard' 
                  : pathname.split('/').pop()?.replace(/-/g, ' ')}
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* CMS Mockup badge */}
            <span className="hidden sm:inline-flex items-center px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full border border-amber-200">
              CMS Mockup
            </span>
            
            {/* Notifications */}
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            
            {/* User dropdown */}
            <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                QT
              </div>
              <span className="hidden sm:block text-sm font-medium">Quality Team</span>
            </button>
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-1">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="py-4 px-6 border-t bg-white">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>Drive Life CMS © 2024</p>
            <p>Prototype Version</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
