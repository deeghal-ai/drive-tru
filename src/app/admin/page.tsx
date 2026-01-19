'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Globe, 
  TrendingUp, 
  AlertTriangle,
  ArrowRight,
  Car,
  Calendar,
  RefreshCw,
  ExternalLink
} from 'lucide-react'
import { cars } from '@/data/cars'
import { cn, formatPrice } from '@/lib/utils'

// Mock admin data
const mockStats = {
  pending: 5,
  approvedToday: 8,
  published: 15,
  totalActive: 18,
  rejectedToday: 2,
  pendingERP: 3
}

const recentActivity = [
  { id: 1, action: 'approved', car: '2023 Suzuki Swift GL', user: 'Sarah Ahmed', time: '5 mins ago', icon: CheckCircle, color: 'text-green-500' },
  { id: 2, action: 'published', car: '2024 Citroen C3 Shine', user: 'System', time: '12 mins ago', icon: Globe, color: 'text-blue-500', platforms: ['Dubizzle', 'Website'] },
  { id: 3, action: 'rejected', car: '2022 Suzuki Baleno', user: 'Mohammed Ali', time: '25 mins ago', icon: XCircle, color: 'text-red-500', reason: 'Poor image quality' },
  { id: 4, action: 'approved', car: '2023 Citroen C5 Aircross', user: 'Sarah Ahmed', time: '1 hour ago', icon: CheckCircle, color: 'text-green-500' },
  { id: 5, action: 'synced', car: '2024 Suzuki Grand Vitara', user: 'System', time: '2 hours ago', icon: RefreshCw, color: 'text-purple-500', target: 'SAP ERP' },
]

const pendingAlerts = [
  { id: 1, message: '3 listings pending for more than 48 hours', severity: 'warning' },
  { id: 2, message: 'Dubizzle sync failed for 2 vehicles', severity: 'error' },
  { id: 3, message: 'YallaMotors API rate limit approaching', severity: 'info' },
]

const platformStats = [
  { name: 'Website', count: 18, color: 'bg-blue-500', total: 20 },
  { name: 'Dubizzle', count: 12, color: 'bg-orange-500', total: 20 },
  { name: 'YallaMotors', count: 8, color: 'bg-green-500', total: 20 },
]

export default function AdminDashboard() {
  const [refreshing, setRefreshing] = useState(false)
  
  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1500)
  }
  
  const pendingCars = cars.slice(0, 5)
  
  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Link 
          href="/admin/approvals?status=pending"
          className="bg-white rounded-xl p-5 shadow-sm border hover:shadow-md transition-shadow group"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending Review</p>
              <p className="text-3xl font-bold mt-1">{mockStats.pending}</p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-3 text-sm text-amber-600">
            <span>View queue</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
        
        <div className="bg-white rounded-xl p-5 shadow-sm border">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Approved Today</p>
              <p className="text-3xl font-bold mt-1">{mockStats.approvedToday}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3 text-sm text-green-600">
            <TrendingUp className="w-4 h-4" />
            <span>+23% from yesterday</span>
          </div>
        </div>
        
        <Link 
          href="/admin/publishing"
          className="bg-white rounded-xl p-5 shadow-sm border hover:shadow-md transition-shadow group"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Published</p>
              <p className="text-3xl font-bold mt-1">{mockStats.published}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Globe className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-3 text-sm text-blue-600">
            <span>Manage publishing</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
        
        <Link
          href="/admin/inventory"
          className="bg-white rounded-xl p-5 shadow-sm border hover:shadow-md transition-shadow group"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Active</p>
              <p className="text-3xl font-bold mt-1">{mockStats.totalActive}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Car className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-3 text-sm text-purple-600">
            <span>View inventory</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>
      
      {/* Main content grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left column - Activity & Alerts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="flex items-center justify-between p-5 border-b">
              <h2 className="font-semibold">Recent Activity</h2>
              <button 
                onClick={handleRefresh}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <RefreshCw className={cn('w-4 h-4 text-muted-foreground', refreshing && 'animate-spin')} />
              </button>
            </div>
            <div className="divide-y">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 p-4 hover:bg-gray-50 transition-colors">
                  <div className={cn('w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0', 
                    activity.action === 'approved' && 'bg-green-100',
                    activity.action === 'rejected' && 'bg-red-100',
                    activity.action === 'published' && 'bg-blue-100',
                    activity.action === 'synced' && 'bg-purple-100'
                  )}>
                    <activity.icon className={cn('w-4 h-4', activity.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>
                      {' '}
                      <span className="text-muted-foreground">
                        {activity.action === 'approved' && 'approved'}
                        {activity.action === 'rejected' && 'rejected'}
                        {activity.action === 'published' && 'published'}
                        {activity.action === 'synced' && 'synced'}
                      </span>
                      {' '}
                      <span className="font-medium">{activity.car}</span>
                    </p>
                    {activity.platforms && (
                      <p className="text-xs text-muted-foreground mt-0.5">
                        to {activity.platforms.join(', ')}
                      </p>
                    )}
                    {activity.reason && (
                      <p className="text-xs text-red-600 mt-0.5">
                        Reason: {activity.reason}
                      </p>
                    )}
                    {activity.target && (
                      <p className="text-xs text-purple-600 mt-0.5">
                        to {activity.target}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
            <div className="p-4 border-t">
              <Link 
                href="/admin/approvals"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
              >
                View all activity
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          
          {/* Pending Approvals Preview */}
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="flex items-center justify-between p-5 border-b">
              <h2 className="font-semibold">Pending Approvals</h2>
              <Link 
                href="/admin/approvals?status=pending"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
              >
                View all
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="divide-y">
              {pendingCars.map((car) => (
                <div key={car.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
                  <div className="w-16 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={car.images[0]} 
                      alt={`${car.make} ${car.model}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">
                      {car.year} {car.make} {car.model} {car.variant}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Submitted 2 days ago • VIN: {car.vin.slice(0, 11)}...
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">{formatPrice(car.price)}</p>
                    <p className="text-xs text-muted-foreground">{car.mileage.toLocaleString()} km</p>
                  </div>
                  <div className="flex gap-1">
                    <button className="p-2 hover:bg-green-100 rounded-lg text-green-600 transition-colors">
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-red-100 rounded-lg text-red-600 transition-colors">
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right column - Publishing & Alerts */}
        <div className="space-y-6">
          {/* Alerts */}
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="flex items-center justify-between p-5 border-b">
              <h2 className="font-semibold">Alerts</h2>
              <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">
                {pendingAlerts.length} active
              </span>
            </div>
            <div className="p-4 space-y-3">
              {pendingAlerts.map((alert) => (
                <div 
                  key={alert.id}
                  className={cn(
                    'p-3 rounded-lg flex items-start gap-3',
                    alert.severity === 'error' && 'bg-red-50',
                    alert.severity === 'warning' && 'bg-amber-50',
                    alert.severity === 'info' && 'bg-blue-50'
                  )}
                >
                  <AlertTriangle className={cn(
                    'w-4 h-4 flex-shrink-0 mt-0.5',
                    alert.severity === 'error' && 'text-red-500',
                    alert.severity === 'warning' && 'text-amber-500',
                    alert.severity === 'info' && 'text-blue-500'
                  )} />
                  <p className="text-sm">{alert.message}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Publishing Status */}
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="flex items-center justify-between p-5 border-b">
              <h2 className="font-semibold">Publishing Status</h2>
              <Link 
                href="/admin/publishing"
                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                Manage
              </Link>
            </div>
            <div className="p-5 space-y-4">
              {platformStats.map((platform) => (
                <div key={platform.name}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="font-medium">{platform.name}</span>
                    <span className="text-muted-foreground">{platform.count}/{platform.total}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={cn('h-full rounded-full transition-all', platform.color)}
                      style={{ width: `${(platform.count / platform.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
              
              <div className="pt-4 border-t mt-4">
                <p className="text-xs text-muted-foreground mb-2">Last sync</p>
                <div className="flex items-center gap-2 text-sm">
                  <RefreshCw className="w-4 h-4 text-green-500" />
                  <span>All platforms synced 5 mins ago</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="p-5 border-b">
              <h2 className="font-semibold">Quick Actions</h2>
            </div>
            <div className="p-4 space-y-2">
              <Link 
                href="/admin/approvals"
                className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors group"
              >
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Review Pending</p>
                  <p className="text-xs text-muted-foreground">5 items waiting</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                href="/admin/publishing"
                className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors group"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Publish to Marketplaces</p>
                  <p className="text-xs text-muted-foreground">8 ready to publish</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors group w-full text-left">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <RefreshCw className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Sync to ERP</p>
                  <p className="text-xs text-muted-foreground">3 pending sync</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </button>
              
              <a 
                href="/en/buy/cars"
                target="_blank"
                className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors group"
              >
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <ExternalLink className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">View Live Site</p>
                  <p className="text-xs text-muted-foreground">Open frontend</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
