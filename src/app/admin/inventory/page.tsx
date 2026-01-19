'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Search, 
  Filter, 
  Download, 
  Plus,
  Eye,
  Edit,
  Trash2,
  ChevronDown,
  Car,
  CheckCircle,
  Clock,
  XCircle,
  ArrowUpDown
} from 'lucide-react'
import { cn, formatPrice } from '@/lib/utils'
import { cars, Car as CarType } from '@/data/cars'

type SortField = 'year' | 'price' | 'mileage' | 'createdAt'
type SortOrder = 'asc' | 'desc'

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterMake, setFilterMake] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [sortField, setSortField] = useState<SortField>('createdAt')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  
  const filteredCars = cars.filter(car => {
    const matchesSearch = searchQuery === '' || 
      `${car.make} ${car.model} ${car.vin}`.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesMake = filterMake === 'all' || car.make === filterMake
    const matchesStatus = filterStatus === 'all' || car.status === filterStatus
    return matchesSearch && matchesMake && matchesStatus
  }).sort((a, b) => {
    let comparison = 0
    switch (sortField) {
      case 'year':
        comparison = a.year - b.year
        break
      case 'price':
        comparison = a.price - b.price
        break
      case 'mileage':
        comparison = a.mileage - b.mileage
        break
      case 'createdAt':
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        break
    }
    return sortOrder === 'asc' ? comparison : -comparison
  })
  
  const stats = {
    total: cars.length,
    available: cars.filter(c => c.status === 'Available').length,
    reserved: cars.filter(c => c.status === 'Reserved').length,
    sold: cars.filter(c => c.status === 'Sold').length,
  }
  
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('desc')
    }
  }
  
  const statusColors = {
    Available: 'bg-green-100 text-green-700',
    Reserved: 'bg-amber-100 text-amber-700',
    Sold: 'bg-red-100 text-red-700',
  }
  
  const statusIcons = {
    Available: CheckCircle,
    Reserved: Clock,
    Sold: XCircle,
  }
  
  return (
    <div className="p-6 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div 
          className={cn(
            'bg-white rounded-xl p-5 shadow-sm border cursor-pointer transition-all',
            filterStatus === 'all' && 'ring-2 ring-primary'
          )}
          onClick={() => setFilterStatus('all')}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Car className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-3xl font-bold">{stats.total}</p>
              <p className="text-sm text-muted-foreground">Total Inventory</p>
            </div>
          </div>
        </div>
        <div 
          className={cn(
            'bg-white rounded-xl p-5 shadow-sm border cursor-pointer transition-all',
            filterStatus === 'Available' && 'ring-2 ring-green-500'
          )}
          onClick={() => setFilterStatus(filterStatus === 'Available' ? 'all' : 'Available')}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-3xl font-bold">{stats.available}</p>
              <p className="text-sm text-muted-foreground">Available</p>
            </div>
          </div>
        </div>
        <div 
          className={cn(
            'bg-white rounded-xl p-5 shadow-sm border cursor-pointer transition-all',
            filterStatus === 'Reserved' && 'ring-2 ring-amber-500'
          )}
          onClick={() => setFilterStatus(filterStatus === 'Reserved' ? 'all' : 'Reserved')}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-3xl font-bold">{stats.reserved}</p>
              <p className="text-sm text-muted-foreground">Reserved</p>
            </div>
          </div>
        </div>
        <div 
          className={cn(
            'bg-white rounded-xl p-5 shadow-sm border cursor-pointer transition-all',
            filterStatus === 'Sold' && 'ring-2 ring-red-500'
          )}
          onClick={() => setFilterStatus(filterStatus === 'Sold' ? 'all' : 'Sold')}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-3xl font-bold">{stats.sold}</p>
              <p className="text-sm text-muted-foreground">Sold</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm border">
        {/* Toolbar */}
        <div className="p-4 border-b flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
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
            
            <select
              value={filterMake}
              onChange={(e) => setFilterMake(e.target.value)}
              className="px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Makes</option>
              <option value="Suzuki">Suzuki</option>
              <option value="Citroen">Citroen</option>
            </select>
          </div>
          
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
              <Plus className="w-4 h-4" />
              Add Vehicle
            </button>
          </div>
        </div>
        
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Vehicle</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">VIN</th>
                <th 
                  className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground"
                  onClick={() => handleSort('year')}
                >
                  <div className="flex items-center gap-1">
                    Year
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground"
                  onClick={() => handleSort('price')}
                >
                  <div className="flex items-center gap-1">
                    Price
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground"
                  onClick={() => handleSort('mileage')}
                >
                  <div className="flex items-center gap-1">
                    Mileage
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Showroom</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredCars.map(car => {
                const StatusIcon = statusIcons[car.status]
                return (
                  <tr key={car.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={car.images[0]} 
                            alt={`${car.make} ${car.model}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{car.make} {car.model} {car.variant}</p>
                          <p className="text-xs text-muted-foreground">{car.color} • {car.transmission}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">
                        {car.vin.slice(0, 11)}...
                      </code>
                    </td>
                    <td className="px-4 py-4 text-sm">{car.year}</td>
                    <td className="px-4 py-4">
                      <p className="font-semibold text-sm">{formatPrice(car.price)}</p>
                    </td>
                    <td className="px-4 py-4 text-sm">{car.mileage.toLocaleString()} km</td>
                    <td className="px-4 py-4 text-sm text-muted-foreground">{car.showroom.name}</td>
                    <td className="px-4 py-4">
                      <span className={cn(
                        'inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium',
                        statusColors[car.status]
                      )}>
                        <StatusIcon className="w-3 h-3" />
                        {car.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link 
                          href={`/en/buy/cars/${car.id}`}
                          target="_blank"
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4 text-gray-600" />
                        </Link>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        
        {filteredCars.length === 0 && (
          <div className="p-16 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Car className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="font-semibold text-lg mb-1">No vehicles found</h3>
            <p className="text-muted-foreground text-sm">
              Try adjusting your search or filters
            </p>
          </div>
        )}
        
        {/* Pagination */}
        {filteredCars.length > 0 && (
          <div className="px-4 py-3 border-t flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium">{filteredCars.length}</span> of{' '}
              <span className="font-medium">{cars.length}</span> vehicles
            </p>
            <div className="flex gap-1">
              <button className="px-3 py-1.5 border rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50" disabled>
                Previous
              </button>
              <button className="px-3 py-1.5 bg-primary text-white rounded-lg text-sm">1</button>
              <button className="px-3 py-1.5 border rounded-lg text-sm hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
