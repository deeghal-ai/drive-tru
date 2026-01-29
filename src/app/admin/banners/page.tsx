'use client'

import { useState } from 'react'
import { Plus, Edit, Trash2, ChevronUp, ChevronDown, Power } from 'lucide-react'
import { CampaignBanner, getAllBanners } from '@/data/banners'
import { BannerFormModal } from '@/components/admin/BannerFormModal'
import { DeleteConfirmDialog } from '@/components/admin/DeleteConfirmDialog'
import { cn } from '@/lib/utils'

export default function BannersPage() {
  // TODO: Production - Replace with real API calls
  const [banners, setBanners] = useState<CampaignBanner[]>(getAllBanners())
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [editingBanner, setEditingBanner] = useState<CampaignBanner | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [bannerToDelete, setBannerToDelete] = useState<CampaignBanner | null>(null)
  
  const handleAddNew = () => {
    setEditingBanner(null)
    setIsFormModalOpen(true)
  }
  
  const handleEdit = (banner: CampaignBanner) => {
    setEditingBanner(banner)
    setIsFormModalOpen(true)
  }
  
  const handleDelete = (banner: CampaignBanner) => {
    setBannerToDelete(banner)
    setDeleteDialogOpen(true)
  }
  
  const confirmDelete = () => {
    if (bannerToDelete) {
      setBanners(banners.filter(b => b.id !== bannerToDelete.id))
      setBannerToDelete(null)
      setDeleteDialogOpen(false)
    }
  }
  
  const handleSaveBanner = (banner: CampaignBanner) => {
    if (editingBanner) {
      // Update existing
      setBanners(banners.map(b => b.id === banner.id ? banner : b))
    } else {
      // Add new
      setBanners([...banners, banner])
    }
    setIsFormModalOpen(false)
    setEditingBanner(null)
  }
  
  const toggleActive = (banner: CampaignBanner) => {
    setBanners(banners.map(b => 
      b.id === banner.id ? { ...b, active: !b.active } : b
    ))
  }
  
  const moveUp = (banner: CampaignBanner) => {
    const index = banners.findIndex(b => b.id === banner.id)
    if (index > 0) {
      const newBanners = [...banners]
      const temp = newBanners[index].displayOrder
      newBanners[index].displayOrder = newBanners[index - 1].displayOrder
      newBanners[index - 1].displayOrder = temp
      newBanners.sort((a, b) => a.displayOrder - b.displayOrder)
      setBanners(newBanners)
    }
  }
  
  const moveDown = (banner: CampaignBanner) => {
    const index = banners.findIndex(b => b.id === banner.id)
    if (index < banners.length - 1) {
      const newBanners = [...banners]
      const temp = newBanners[index].displayOrder
      newBanners[index].displayOrder = newBanners[index + 1].displayOrder
      newBanners[index + 1].displayOrder = temp
      newBanners.sort((a, b) => a.displayOrder - b.displayOrder)
      setBanners(newBanners)
    }
  }
  
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Campaign Banners</h1>
          <p className="text-gray-600 mt-1">
            Manage homepage carousel banners
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add New Banner
        </button>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <p className="text-sm text-gray-600">Total Banners</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{banners.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <p className="text-sm text-gray-600">Active</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {banners.filter(b => b.active).length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <p className="text-sm text-gray-600">Inactive</p>
          <p className="text-2xl font-bold text-gray-400 mt-1">
            {banners.filter(b => !b.active).length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <p className="text-sm text-gray-600">Display Order</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">1-{banners.length}</p>
        </div>
      </div>
      
      {/* Banners Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        {banners.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No banners yet</h3>
            <p className="text-gray-600 mb-6">Create your first campaign banner to get started</p>
            <button
              onClick={handleAddNew}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add New Banner
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preview
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CTA Link
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {banners.map((banner, index) => (
                  <tr key={banner.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="relative w-32 h-20 rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={banner.image}
                          alt={banner.titleEn}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center px-2">
                          <p className="text-white text-xs font-semibold truncate">
                            {banner.titleEn}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p className="font-medium text-gray-900">{banner.titleEn}</p>
                        <p className="text-gray-500 truncate max-w-xs">{banner.subtitleEn}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleActive(banner)}
                        className={cn(
                          'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors',
                          banner.active
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        )}
                      >
                        <Power className="w-3 h-3" />
                        {banner.active ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">
                          {banner.displayOrder}
                        </span>
                        <div className="flex flex-col gap-0.5">
                          <button
                            onClick={() => moveUp(banner)}
                            disabled={index === 0}
                            className="p-0.5 rounded hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <ChevronUp className="w-4 h-4 text-gray-600" />
                          </button>
                          <button
                            onClick={() => moveDown(banner)}
                            disabled={index === banners.length - 1}
                            className="p-0.5 rounded hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <ChevronDown className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a
                        href={banner.ctaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 hover:underline truncate block max-w-xs"
                      >
                        {banner.ctaLink}
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(banner)}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit banner"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(banner)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete banner"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Modals */}
      <BannerFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false)
          setEditingBanner(null)
        }}
        banner={editingBanner}
        onSave={handleSaveBanner}
      />
      
      <DeleteConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false)
          setBannerToDelete(null)
        }}
        onConfirm={confirmDelete}
        title="Delete Banner"
        description={`Are you sure you want to delete "${bannerToDelete?.titleEn}"? This action cannot be undone.`}
      />
    </div>
  )
}
