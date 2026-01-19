'use client'

import { useState } from 'react'
import { 
  Check, 
  X, 
  Eye, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Globe,
  ChevronDown,
  Search,
  Filter,
  Image as ImageIcon,
  RotateCcw,
  ExternalLink,
  Calendar,
  MapPin,
  Fuel,
  Gauge,
  Car as CarIcon
} from 'lucide-react'
import { cn, formatPrice } from '@/lib/utils'
import { cars, Car } from '@/data/cars'

type Status = 'pending' | 'approved' | 'rejected'

interface ListingItem extends Car {
  approvalStatus: Status
  submittedBy: string
  submittedAt: string
  imagesCount: number
  has360: boolean
  publishedTo: string[]
}

// Create mock admin listings from car data
const createMockListings = (): ListingItem[] => {
  return cars.slice(0, 15).map((car, i) => ({
    ...car,
    approvalStatus: i < 5 ? 'pending' : i < 11 ? 'approved' : 'rejected' as Status,
    submittedBy: ['John Dealer', 'Sarah Ahmed', 'Mohammed Ali', 'Fatima Hassan'][i % 4],
    submittedAt: `2024-01-${(15 - i).toString().padStart(2, '0')}`,
    imagesCount: Math.floor(Math.random() * 6) + 4,
    has360: Math.random() > 0.4,
    publishedTo: i < 5 ? [] : i % 2 === 0 ? ['Website', 'Dubizzle'] : ['Website'],
  }))
}

export default function AdminApprovalsPage() {
  const [activeTab, setActiveTab] = useState<Status | 'all'>('pending')
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [listings, setListings] = useState<ListingItem[]>(createMockListings)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedListing, setSelectedListing] = useState<ListingItem | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [rejectReason, setRejectReason] = useState('')
  const [rejectNotes, setRejectNotes] = useState('')
  const [listingToReject, setListingToReject] = useState<string | null>(null)
  
  const filteredListings = listings.filter(l => {
    const matchesTab = activeTab === 'all' || l.approvalStatus === activeTab
    const matchesSearch = searchQuery === '' || 
      `${l.make} ${l.model} ${l.vin}`.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesSearch
  })
  
  const stats = {
    pending: listings.filter(l => l.approvalStatus === 'pending').length,
    approved: listings.filter(l => l.approvalStatus === 'approved').length,
    rejected: listings.filter(l => l.approvalStatus === 'rejected').length,
  }
  
  const toggleSelect = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }
  
  const toggleSelectAll = () => {
    if (selectedItems.length === filteredListings.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(filteredListings.map(l => l.id))
    }
  }
  
  const updateStatus = (ids: string[], status: Status) => {
    setListings(prev => prev.map(l => 
      ids.includes(l.id) ? { ...l, approvalStatus: status } : l
    ))
    setSelectedItems([])
  }
  
  const handleReject = () => {
    if (listingToReject) {
      updateStatus([listingToReject], 'rejected')
      setShowRejectModal(false)
      setRejectReason('')
      setRejectNotes('')
      setListingToReject(null)
    }
  }
  
  const openRejectModal = (id: string) => {
    setListingToReject(id)
    setShowRejectModal(true)
  }
  
  const openDetailModal = (listing: ListingItem) => {
    setSelectedListing(listing)
    setShowDetailModal(true)
  }
  
  const statusColors = {
    pending: 'bg-amber-100 text-amber-700',
    approved: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
  }
  
  const rejectReasons = [
    'Poor image quality',
    'Missing vehicle information',
    'Incorrect pricing',
    'VIN mismatch',
    'Duplicate listing',
    'Policy violation',
    'Other'
  ]
  
  return (
    <div className="p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div 
          className={cn(
            'bg-white rounded-xl p-5 shadow-sm border cursor-pointer transition-all',
            activeTab === 'pending' && 'ring-2 ring-amber-500'
          )}
          onClick={() => setActiveTab('pending')}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-3xl font-bold">{stats.pending}</p>
              <p className="text-sm text-muted-foreground">Pending Review</p>
            </div>
          </div>
        </div>
        <div 
          className={cn(
            'bg-white rounded-xl p-5 shadow-sm border cursor-pointer transition-all',
            activeTab === 'approved' && 'ring-2 ring-green-500'
          )}
          onClick={() => setActiveTab('approved')}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-3xl font-bold">{stats.approved}</p>
              <p className="text-sm text-muted-foreground">Approved</p>
            </div>
          </div>
        </div>
        <div 
          className={cn(
            'bg-white rounded-xl p-5 shadow-sm border cursor-pointer transition-all',
            activeTab === 'rejected' && 'ring-2 ring-red-500'
          )}
          onClick={() => setActiveTab('rejected')}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-3xl font-bold">{stats.rejected}</p>
              <p className="text-sm text-muted-foreground">Rejected</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm border">
        {/* Toolbar */}
        <div className="p-4 border-b flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="flex gap-2">
            {[
              { key: 'all', label: 'All Listings' },
              { key: 'pending', label: 'Pending' },
              { key: 'approved', label: 'Approved' },
              { key: 'rejected', label: 'Rejected' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  activeTab === tab.key 
                    ? 'bg-primary text-white' 
                    : 'text-muted-foreground hover:bg-gray-100'
                )}
              >
                {tab.label}
                {tab.key !== 'all' && (
                  <span className="ml-2 bg-white/20 px-1.5 py-0.5 rounded text-xs">
                    {stats[tab.key as keyof typeof stats]}
                  </span>
                )}
              </button>
            ))}
          </div>
          
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by make, model, VIN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg text-sm w-64 focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>
        
        {/* Bulk Actions */}
        {selectedItems.length > 0 && (
          <div className="bg-blue-50 px-4 py-3 flex items-center gap-4 border-b">
            <span className="text-sm font-medium text-blue-800">
              {selectedItems.length} selected
            </span>
            <div className="flex gap-2">
              <button 
                onClick={() => updateStatus(selectedItems, 'approved')}
                className="px-3 py-1.5 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors flex items-center gap-1"
              >
                <Check className="w-4 h-4" />
                Approve All
              </button>
              <button 
                onClick={() => updateStatus(selectedItems, 'rejected')}
                className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                Reject All
              </button>
            </div>
            <button 
              onClick={() => setSelectedItems([])}
              className="text-sm text-blue-600 hover:text-blue-700 ml-auto"
            >
              Clear Selection
            </button>
          </div>
        )}
        
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left w-10">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === filteredListings.length && filteredListings.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Vehicle</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">VIN</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Price</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Media</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Published</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredListings.map(listing => (
                <tr 
                  key={listing.id} 
                  className="hover:bg-gray-50 transition-colors group"
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(listing.id)}
                      onChange={() => toggleSelect(listing.id)}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="px-4 py-3">
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
                        <p className="text-xs text-muted-foreground">by {listing.submittedBy}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">
                      {listing.vin.slice(0, 11)}...
                    </code>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-sm">{formatPrice(listing.price)}</p>
                    <p className="text-xs text-muted-foreground">{listing.mileage.toLocaleString()} km</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded">
                        <ImageIcon className="w-3 h-3" />
                        {listing.imagesCount}
                      </span>
                      {listing.has360 && (
                        <span className="inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          <RotateCcw className="w-3 h-3" />
                          360°
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {listing.publishedTo.length > 0 ? (
                        listing.publishedTo.map(platform => (
                          <span 
                            key={platform} 
                            className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-medium"
                          >
                            {platform}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-muted-foreground">Not published</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn('text-xs px-2.5 py-1 rounded-full font-medium capitalize', statusColors[listing.approvalStatus])}>
                      {listing.approvalStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => openDetailModal(listing)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors" 
                        title="View Details"
                      >
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      {listing.approvalStatus === 'pending' && (
                        <>
                          <button 
                            onClick={() => updateStatus([listing.id], 'approved')}
                            className="p-2 hover:bg-green-100 rounded-lg text-green-600 transition-colors" 
                            title="Approve"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => openRejectModal(listing.id)}
                            className="p-2 hover:bg-red-100 rounded-lg text-red-600 transition-colors" 
                            title="Reject"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      {listing.approvalStatus === 'approved' && (
                        <button 
                          className="p-2 hover:bg-blue-100 rounded-lg text-blue-600 transition-colors" 
                          title="Publish"
                        >
                          <Globe className="w-4 h-4" />
                        </button>
                      )}
                      {listing.approvalStatus === 'rejected' && (
                        <button 
                          onClick={() => updateStatus([listing.id], 'pending')}
                          className="p-2 hover:bg-amber-100 rounded-lg text-amber-600 transition-colors" 
                          title="Re-review"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
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
              <CarIcon className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="font-semibold text-lg mb-1">No listings found</h3>
            <p className="text-muted-foreground text-sm">
              {searchQuery ? 'Try adjusting your search query' : 'There are no listings in this category'}
            </p>
          </div>
        )}
        
        {/* Pagination */}
        {filteredListings.length > 0 && (
          <div className="px-4 py-3 border-t flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium">{filteredListings.length}</span> of{' '}
              <span className="font-medium">{listings.length}</span> listings
            </p>
            <div className="flex gap-1">
              <button className="px-3 py-1.5 border rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50" disabled>
                Previous
              </button>
              <button className="px-3 py-1.5 bg-primary text-white rounded-lg text-sm">1</button>
              <button className="px-3 py-1.5 border rounded-lg text-sm hover:bg-gray-50">2</button>
              <button className="px-3 py-1.5 border rounded-lg text-sm hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Listing Detail Modal */}
      {showDetailModal && selectedListing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-xl font-bold">
                  {selectedListing.year} {selectedListing.make} {selectedListing.model} {selectedListing.variant}
                </h2>
                <p className="text-sm text-muted-foreground">VIN: {selectedListing.vin}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={cn('text-sm px-3 py-1 rounded-full font-medium capitalize', statusColors[selectedListing.approvalStatus])}>
                  {selectedListing.approvalStatus}
                </span>
                <button 
                  onClick={() => setShowDetailModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="overflow-y-auto max-h-[calc(90vh-160px)]">
              <div className="p-6 grid md:grid-cols-2 gap-6">
                {/* Images */}
                <div>
                  <div className="aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden mb-4">
                    <img 
                      src={selectedListing.images[0]} 
                      alt={`${selectedListing.make} ${selectedListing.model}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img 
                          src={selectedListing.images[0]} 
                          alt={`Thumbnail ${i}`}
                          className="w-full h-full object-cover opacity-80"
                        />
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-semibold text-sm mb-2">Media Status</h4>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1 text-sm bg-white px-3 py-1.5 rounded-lg border">
                        <ImageIcon className="w-4 h-4" />
                        {selectedListing.imagesCount} Photos
                      </span>
                      {selectedListing.has360 && (
                        <span className="inline-flex items-center gap-1 text-sm bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg">
                          <RotateCcw className="w-4 h-4" />
                          360° View Available
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Details */}
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">Vehicle Details</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-muted-foreground">Price</p>
                        <p className="font-semibold">{formatPrice(selectedListing.price)}</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-muted-foreground">Mileage</p>
                        <p className="font-semibold">{selectedListing.mileage.toLocaleString()} km</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-muted-foreground">Year</p>
                        <p className="font-semibold">{selectedListing.year}</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-muted-foreground">Body Type</p>
                        <p className="font-semibold">{selectedListing.bodyType}</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-muted-foreground">Fuel Type</p>
                        <p className="font-semibold">{selectedListing.fuelType}</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-muted-foreground">Transmission</p>
                        <p className="font-semibold">{selectedListing.transmission}</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-muted-foreground">Color</p>
                        <p className="font-semibold">{selectedListing.color}</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-muted-foreground">Specs</p>
                        <p className="font-semibold">{selectedListing.specs.regional}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">Submission Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Submitted:</span>
                        <span>{selectedListing.submittedAt}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Showroom:</span>
                        <span>{selectedListing.showroom.name}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">Features</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedListing.features.map(feature => (
                        <span key={feature} className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {selectedListing.certified && (
                    <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                      <div className="flex items-center gap-2 text-green-700">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-semibold">Certified Pre-Owned</span>
                      </div>
                      {selectedListing.warranty && (
                        <p className="text-sm text-green-600 mt-1">{selectedListing.warranty}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Footer Actions */}
            <div className="p-6 border-t bg-gray-50 flex items-center justify-between">
              <a 
                href={`/en/buy/cars/${selectedListing.id}`}
                target="_blank"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
              >
                View on Website
                <ExternalLink className="w-4 h-4" />
              </a>
              
              {selectedListing.approvalStatus === 'pending' && (
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      setShowDetailModal(false)
                      openRejectModal(selectedListing.id)
                    }}
                    className="px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium"
                  >
                    Reject
                  </button>
                  <button 
                    onClick={() => {
                      updateStatus([selectedListing.id], 'approved')
                      setShowDetailModal(false)
                    }}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Approve Listing
                  </button>
                </div>
              )}
              
              {selectedListing.approvalStatus === 'approved' && (
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Publish to Marketplaces
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">Reject Listing</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Please provide a reason for rejecting this listing
              </p>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Reason</label>
                <select 
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select a reason...</option>
                  {rejectReasons.map(reason => (
                    <option key={reason} value={reason}>{reason}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Additional Notes (Optional)</label>
                <textarea 
                  value={rejectNotes}
                  onChange={(e) => setRejectNotes(e.target.value)}
                  placeholder="Provide more details about the rejection..."
                  rows={3}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                />
              </div>
            </div>
            
            <div className="p-6 border-t bg-gray-50 flex justify-end gap-2 rounded-b-2xl">
              <button 
                onClick={() => {
                  setShowRejectModal(false)
                  setRejectReason('')
                  setRejectNotes('')
                  setListingToReject(null)
                }}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={handleReject}
                disabled={!rejectReason}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <XCircle className="w-4 h-4" />
                Reject Listing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
