'use client'

import { useState } from 'react'
import { 
  Globe, 
  Check, 
  X, 
  RefreshCw, 
  ExternalLink,
  Search,
  Filter,
  CheckCircle,
  AlertCircle,
  Clock,
  ChevronDown,
  ArrowUpRight,
  Zap
} from 'lucide-react'
import { cn, formatPrice } from '@/lib/utils'
import { cars, Car } from '@/data/cars'

type Platform = 'website' | 'dubizzle' | 'yallamotors'

interface PublishableListing extends Car {
  publishedTo: Platform[]
  lastSynced: string | null
  syncStatus: 'synced' | 'pending' | 'error' | 'none'
}

// Create mock publishable listings from approved cars
const createPublishableListings = (): PublishableListing[] => {
  return cars.slice(0, 12).map((car, i) => ({
    ...car,
    publishedTo: i < 3 
      ? ['website', 'dubizzle', 'yallamotors'] as Platform[]
      : i < 6 
        ? ['website', 'dubizzle'] as Platform[]
        : i < 9
          ? ['website'] as Platform[]
          : [] as Platform[],
    lastSynced: i < 9 ? `${Math.floor(Math.random() * 30) + 1} mins ago` : null,
    syncStatus: i < 8 ? 'synced' : i === 8 ? 'error' : i === 9 ? 'pending' : 'none' as const
  }))
}

const platforms = [
  { 
    id: 'website' as Platform, 
    name: 'Drive Tru Website', 
    icon: '🌐',
    color: 'bg-blue-500',
    description: 'Your main website',
    url: 'drivetru.ae'
  },
  { 
    id: 'dubizzle' as Platform, 
    name: 'Dubizzle', 
    icon: '🟠',
    color: 'bg-orange-500',
    description: 'UAE\'s #1 classifieds',
    url: 'dubizzle.com'
  },
  { 
    id: 'yallamotors' as Platform, 
    name: 'YallaMotors', 
    icon: '🚗',
    color: 'bg-green-500',
    description: 'Auto marketplace',
    url: 'yallamotors.com'
  }
]

export default function PublishingCenterPage() {
  const [listings, setListings] = useState<PublishableListing[]>(createPublishableListings)
  const [selectedListings, setSelectedListings] = useState<string[]>([])
  const [showPublishModal, setShowPublishModal] = useState(false)
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filterPlatform, setFilterPlatform] = useState<Platform | 'all'>('all')
  const [syncing, setSyncing] = useState(false)
  const [publishSuccess, setPublishSuccess] = useState(false)
  
  const filteredListings = listings.filter(l => {
    const matchesSearch = searchQuery === '' || 
      `${l.make} ${l.model}`.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPlatform = filterPlatform === 'all' || 
      l.publishedTo.includes(filterPlatform) ||
      (filterPlatform === 'website' && l.publishedTo.length === 0) // Show unpublished in website filter
    return matchesSearch && matchesPlatform
  })
  
  const stats = {
    total: listings.length,
    website: listings.filter(l => l.publishedTo.includes('website')).length,
    dubizzle: listings.filter(l => l.publishedTo.includes('dubizzle')).length,
    yallamotors: listings.filter(l => l.publishedTo.includes('yallamotors')).length,
    unpublished: listings.filter(l => l.publishedTo.length === 0).length,
  }
  
  const toggleSelect = (id: string) => {
    setSelectedListings(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }
  
  const toggleSelectAll = () => {
    if (selectedListings.length === filteredListings.length) {
      setSelectedListings([])
    } else {
      setSelectedListings(filteredListings.map(l => l.id))
    }
  }
  
  const togglePlatform = (platform: Platform) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    )
  }
  
  const handlePublish = () => {
    setSyncing(true)
    
    // Simulate publishing
    setTimeout(() => {
      setListings(prev => prev.map(l => 
        selectedListings.includes(l.id)
          ? { 
              ...l, 
              publishedTo: [...new Set([...l.publishedTo, ...selectedPlatforms])] as Platform[],
              lastSynced: 'Just now',
              syncStatus: 'synced' as const
            }
          : l
      ))
      setSyncing(false)
      setPublishSuccess(true)
      
      setTimeout(() => {
        setShowPublishModal(false)
        setSelectedListings([])
        setSelectedPlatforms([])
        setPublishSuccess(false)
      }, 2000)
    }, 2000)
  }
  
  const handleUnpublish = (listingId: string, platform: Platform) => {
    setListings(prev => prev.map(l => 
      l.id === listingId
        ? { ...l, publishedTo: l.publishedTo.filter(p => p !== platform) }
        : l
    ))
  }
  
  const handleSyncAll = () => {
    setSyncing(true)
    setTimeout(() => {
      setListings(prev => prev.map(l => ({
        ...l,
        lastSynced: l.publishedTo.length > 0 ? 'Just now' : null,
        syncStatus: l.publishedTo.length > 0 ? 'synced' as const : 'none' as const
      })))
      setSyncing(false)
    }, 2000)
  }
  
  return (
    <div className="p-6 space-y-6">
      {/* Platform Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {platforms.map(platform => (
          <div 
            key={platform.id}
            className={cn(
              'bg-white rounded-xl p-5 shadow-sm border cursor-pointer transition-all hover:shadow-md',
              filterPlatform === platform.id && 'ring-2 ring-primary'
            )}
            onClick={() => setFilterPlatform(filterPlatform === platform.id ? 'all' : platform.id)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center text-2xl', platform.color.replace('bg-', 'bg-opacity-20 bg-'))}>
                {platform.icon}
              </div>
              <div className="flex items-center gap-1 text-green-600 text-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Connected
              </div>
            </div>
            <h3 className="font-semibold">{platform.name}</h3>
            <p className="text-sm text-muted-foreground mb-3">{platform.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">
                {stats[platform.id as keyof typeof stats]}
              </span>
              <span className="text-xs text-muted-foreground">listings</span>
            </div>
          </div>
        ))}
        
        {/* Unpublished Card */}
        <div 
          className={cn(
            'bg-white rounded-xl p-5 shadow-sm border cursor-pointer transition-all hover:shadow-md',
            filterPlatform === 'all' && 'ring-2 ring-primary'
          )}
          onClick={() => setFilterPlatform('all')}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-gray-100">
              📋
            </div>
            {stats.unpublished > 0 && (
              <span className="bg-amber-100 text-amber-700 text-xs font-medium px-2 py-0.5 rounded-full">
                {stats.unpublished} pending
              </span>
            )}
          </div>
          <h3 className="font-semibold">All Approved</h3>
          <p className="text-sm text-muted-foreground mb-3">Ready to publish</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">{stats.total}</span>
            <span className="text-xs text-muted-foreground">total</span>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm border">
        {/* Toolbar */}
        <div className="p-4 border-b flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <h2 className="font-semibold text-lg">Publishing Queue</h2>
            <button
              onClick={handleSyncAll}
              disabled={syncing}
              className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={cn('w-4 h-4', syncing && 'animate-spin')} />
              Sync All
            </button>
          </div>
          
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search vehicles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg text-sm w-56 focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            {selectedListings.length > 0 && (
              <button 
                onClick={() => setShowPublishModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                <Globe className="w-4 h-4" />
                Publish Selected ({selectedListings.length})
              </button>
            )}
          </div>
        </div>
        
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left w-10">
                  <input
                    type="checkbox"
                    checked={selectedListings.length === filteredListings.length && filteredListings.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Vehicle</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Price</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">Website</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">Dubizzle</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">YallaMotors</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Sync Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredListings.map(listing => (
                <tr key={listing.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedListings.includes(listing.id)}
                      onChange={() => toggleSelect(listing.id)}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={listing.images[0]} 
                          alt={`${listing.make} ${listing.model}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{listing.year} {listing.make} {listing.model}</p>
                        <p className="text-xs text-muted-foreground">{listing.mileage.toLocaleString()} km • {listing.color}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <p className="font-semibold text-sm">{formatPrice(listing.price)}</p>
                  </td>
                  
                  {/* Platform Status Cells */}
                  {(['website', 'dubizzle', 'yallamotors'] as Platform[]).map(platform => (
                    <td key={platform} className="px-4 py-4 text-center">
                      {listing.publishedTo.includes(platform) ? (
                        <div className="inline-flex items-center gap-1">
                          <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          </span>
                          <button 
                            onClick={() => handleUnpublish(listing.id, platform)}
                            className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                            title="Unpublish"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <span className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                          <span className="w-2 h-2 bg-gray-300 rounded-full" />
                        </span>
                      )}
                    </td>
                  ))}
                  
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      {listing.syncStatus === 'synced' && (
                        <>
                          <span className="w-2 h-2 bg-green-500 rounded-full" />
                          <span className="text-xs text-green-600">{listing.lastSynced}</span>
                        </>
                      )}
                      {listing.syncStatus === 'pending' && (
                        <>
                          <Clock className="w-4 h-4 text-amber-500" />
                          <span className="text-xs text-amber-600">Pending</span>
                        </>
                      )}
                      {listing.syncStatus === 'error' && (
                        <>
                          <AlertCircle className="w-4 h-4 text-red-500" />
                          <span className="text-xs text-red-600">Sync failed</span>
                        </>
                      )}
                      {listing.syncStatus === 'none' && (
                        <span className="text-xs text-muted-foreground">Not published</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredListings.length === 0 && (
          <div className="p-16 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="font-semibold text-lg mb-1">No listings found</h3>
            <p className="text-muted-foreground text-sm">
              Try adjusting your search or filter
            </p>
          </div>
        )}
      </div>
      
      {/* Integration Info */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Zap className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">Marketplace Integration</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Vehicles are automatically synced to connected marketplaces. Changes on the main website are pushed to all platforms within minutes.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 text-sm bg-white px-3 py-1.5 rounded-lg border">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                <span>API Connected</span>
              </div>
              <div className="flex items-center gap-2 text-sm bg-white px-3 py-1.5 rounded-lg border">
                <RefreshCw className="w-4 h-4 text-blue-500" />
                <span>Auto-sync every 15 mins</span>
              </div>
              <div className="flex items-center gap-2 text-sm bg-white px-3 py-1.5 rounded-lg border">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Last sync: 2 mins ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Publish Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full">
            {!publishSuccess ? (
              <>
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold">Publish to Marketplaces</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Select platforms to publish {selectedListings.length} listing{selectedListings.length > 1 ? 's' : ''}
                  </p>
                </div>
                
                <div className="p-6 space-y-4">
                  {platforms.map(platform => (
                    <label 
                      key={platform.id}
                      className={cn(
                        'flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all',
                        selectedPlatforms.includes(platform.id) 
                          ? 'border-primary bg-primary/5' 
                          : 'hover:border-gray-300'
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={selectedPlatforms.includes(platform.id)}
                        onChange={() => togglePlatform(platform.id)}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center text-xl', platform.color.replace('bg-', 'bg-opacity-20 bg-'))}>
                        {platform.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{platform.name}</p>
                        <p className="text-sm text-muted-foreground">{platform.url}</p>
                      </div>
                      {selectedPlatforms.includes(platform.id) && (
                        <CheckCircle className="w-5 h-5 text-primary" />
                      )}
                    </label>
                  ))}
                </div>
                
                <div className="p-6 border-t bg-gray-50 flex justify-end gap-2 rounded-b-2xl">
                  <button 
                    onClick={() => {
                      setShowPublishModal(false)
                      setSelectedPlatforms([])
                    }}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handlePublish}
                    disabled={selectedPlatforms.length === 0 || syncing}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {syncing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Publishing...
                      </>
                    ) : (
                      <>
                        <Globe className="w-4 h-4" />
                        Publish Now
                      </>
                    )}
                  </button>
                </div>
              </>
            ) : (
              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Published Successfully!</h3>
                <p className="text-muted-foreground mb-6">
                  {selectedListings.length} listing{selectedListings.length > 1 ? 's have' : ' has'} been published to {selectedPlatforms.length} platform{selectedPlatforms.length > 1 ? 's' : ''}.
                </p>
                <div className="flex justify-center gap-2">
                  {selectedPlatforms.map(platformId => {
                    const platform = platforms.find(p => p.id === platformId)
                    return platform ? (
                      <span key={platformId} className="inline-flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-lg text-sm">
                        {platform.icon} {platform.name}
                      </span>
                    ) : null
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
