'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { CampaignBanner } from '@/data/banners'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ImageUploadButton } from './ImageUploadButton'
import { ImageCropperModal } from './ImageCropperModal'

interface BannerFormModalProps {
  isOpen: boolean
  onClose: () => void
  banner: CampaignBanner | null
  onSave: (banner: CampaignBanner) => void
}

export function BannerFormModal({
  isOpen,
  onClose,
  banner,
  onSave
}: BannerFormModalProps) {
  const isEditing = !!banner
  
  // Form state
  const [formData, setFormData] = useState<Partial<CampaignBanner>>({
    titleEn: '',
    titleAr: '',
    subtitleEn: '',
    subtitleAr: '',
    ctaTextEn: '',
    ctaTextAr: '',
    ctaLink: '/buy/cars',
    image: '',
    active: true,
    displayOrder: 1
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSaving, setIsSaving] = useState(false)
  const [showImageCropper, setShowImageCropper] = useState(false)
  const [tempImageUrl, setTempImageUrl] = useState<string>('')
  
  // Reset form when banner changes
  useEffect(() => {
    if (banner) {
      setFormData(banner)
    } else {
      setFormData({
        titleEn: '',
        titleAr: '',
        subtitleEn: '',
        subtitleAr: '',
        ctaTextEn: '',
        ctaTextAr: '',
        ctaLink: '/buy/cars',
        image: '',
        active: true,
        displayOrder: 1
      })
    }
    setErrors({})
  }, [banner, isOpen])
  
  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }
  
  const handleImageSelected = (imageUrl: string) => {
    setTempImageUrl(imageUrl)
    setShowImageCropper(true)
  }
  
  const handleCropComplete = (croppedImageUrl: string) => {
    handleChange('image', croppedImageUrl)
    setShowImageCropper(false)
    setTempImageUrl('')
  }
  
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.titleEn?.trim()) {
      newErrors.titleEn = 'English title is required'
    }
    if (!formData.titleAr?.trim()) {
      newErrors.titleAr = 'Arabic title is required'
    }
    if (!formData.subtitleEn?.trim()) {
      newErrors.subtitleEn = 'English subtitle is required'
    }
    if (!formData.subtitleAr?.trim()) {
      newErrors.subtitleAr = 'Arabic subtitle is required'
    }
    if (!formData.ctaTextEn?.trim()) {
      newErrors.ctaTextEn = 'English CTA text is required'
    }
    if (!formData.ctaTextAr?.trim()) {
      newErrors.ctaTextAr = 'Arabic CTA text is required'
    }
    if (!formData.ctaLink?.trim()) {
      newErrors.ctaLink = 'CTA link is required'
    }
    if (!formData.image?.trim()) {
      newErrors.image = 'Banner image is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = async () => {
    if (!validate()) return
    
    setIsSaving(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const bannerData: CampaignBanner = {
      id: banner?.id || `banner-${Date.now()}`,
      titleEn: formData.titleEn!,
      titleAr: formData.titleAr!,
      subtitleEn: formData.subtitleEn!,
      subtitleAr: formData.subtitleAr!,
      ctaTextEn: formData.ctaTextEn!,
      ctaTextAr: formData.ctaTextAr!,
      ctaLink: formData.ctaLink!,
      image: formData.image!,
      active: formData.active ?? true,
      displayOrder: formData.displayOrder ?? 1,
      createdAt: banner?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    onSave(bannerData)
    setIsSaving(false)
  }
  
  const commonPageLinks = [
    { label: 'Browse Cars', value: '/buy/cars' },
    { label: 'Popular Models', value: '/buy/popular' },
    { label: 'SUVs', value: '/buy/cars?bodyType=SUV' },
    { label: 'Sedans', value: '/buy/cars?bodyType=Sedan' },
    { label: 'Sell Your Car', value: '/sell/valuation' },
    { label: 'Trade-In', value: '/sell/trade-in' },
    { label: 'Finance Calculator', value: '/finance/calculator' },
    { label: 'Offers', value: '/offers' },
  ]
  
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>
              {isEditing ? 'Edit Banner' : 'Add New Banner'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 overflow-auto p-6">
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="image">Image</TabsTrigger>
              </TabsList>
              
              <TabsContent value="content" className="space-y-4 mt-4">
                {/* English Content */}
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-sm text-gray-700">English Content</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="titleEn">Title *</Label>
                    <Input
                      id="titleEn"
                      value={formData.titleEn}
                      onChange={(e) => handleChange('titleEn', e.target.value)}
                      placeholder="Limited Time Offer"
                      className={errors.titleEn ? 'border-red-500' : ''}
                    />
                    {errors.titleEn && (
                      <p className="text-sm text-red-600">{errors.titleEn}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subtitleEn">Subtitle *</Label>
                    <Textarea
                      id="subtitleEn"
                      value={formData.subtitleEn}
                      onChange={(e) => handleChange('subtitleEn', e.target.value)}
                      placeholder="Get 0% financing on all certified pre-owned vehicles"
                      rows={2}
                      className={errors.subtitleEn ? 'border-red-500' : ''}
                    />
                    {errors.subtitleEn && (
                      <p className="text-sm text-red-600">{errors.subtitleEn}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="ctaTextEn">CTA Button Text *</Label>
                    <Input
                      id="ctaTextEn"
                      value={formData.ctaTextEn}
                      onChange={(e) => handleChange('ctaTextEn', e.target.value)}
                      placeholder="Shop Now"
                      className={errors.ctaTextEn ? 'border-red-500' : ''}
                    />
                    {errors.ctaTextEn && (
                      <p className="text-sm text-red-600">{errors.ctaTextEn}</p>
                    )}
                  </div>
                </div>
                
                {/* Arabic Content */}
                <div className="space-y-4 p-4 bg-blue-50 rounded-lg" dir="rtl">
                  <h3 className="font-semibold text-sm text-gray-700">المحتوى العربي</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="titleAr">العنوان *</Label>
                    <Input
                      id="titleAr"
                      value={formData.titleAr}
                      onChange={(e) => handleChange('titleAr', e.target.value)}
                      placeholder="عرض لفترة محدودة"
                      className={errors.titleAr ? 'border-red-500' : ''}
                    />
                    {errors.titleAr && (
                      <p className="text-sm text-red-600">{errors.titleAr}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subtitleAr">العنوان الفرعي *</Label>
                    <Textarea
                      id="subtitleAr"
                      value={formData.subtitleAr}
                      onChange={(e) => handleChange('subtitleAr', e.target.value)}
                      placeholder="احصل على تمويل بفائدة 0% على جميع السيارات المعتمدة"
                      rows={2}
                      className={errors.subtitleAr ? 'border-red-500' : ''}
                    />
                    {errors.subtitleAr && (
                      <p className="text-sm text-red-600">{errors.subtitleAr}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="ctaTextAr">نص الزر *</Label>
                    <Input
                      id="ctaTextAr"
                      value={formData.ctaTextAr}
                      onChange={(e) => handleChange('ctaTextAr', e.target.value)}
                      placeholder="تسوق الآن"
                      className={errors.ctaTextAr ? 'border-red-500' : ''}
                    />
                    {errors.ctaTextAr && (
                      <p className="text-sm text-red-600">{errors.ctaTextAr}</p>
                    )}
                  </div>
                </div>
                
                {/* CTA Link */}
                <div className="space-y-2">
                  <Label htmlFor="ctaLink">CTA Link *</Label>
                  <div className="flex gap-2">
                    <select
                      className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
                      value={formData.ctaLink}
                      onChange={(e) => handleChange('ctaLink', e.target.value)}
                    >
                      {commonPageLinks.map(link => (
                        <option key={link.value} value={link.value}>
                          {link.label} ({link.value})
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.ctaLink && (
                    <p className="text-sm text-red-600">{errors.ctaLink}</p>
                  )}
                  <p className="text-xs text-gray-500">
                    Or enter custom URL starting with /
                  </p>
                </div>
                
                {/* Settings */}
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-sm text-gray-700">Settings</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="active">Active</Label>
                      <p className="text-xs text-gray-500">
                        Banner will be visible on homepage
                      </p>
                    </div>
                    <Switch
                      id="active"
                      checked={formData.active}
                      onCheckedChange={(checked) => handleChange('active', checked)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="displayOrder">Display Order</Label>
                    <Input
                      id="displayOrder"
                      type="number"
                      min="1"
                      value={formData.displayOrder}
                      onChange={(e) => handleChange('displayOrder', parseInt(e.target.value))}
                      className="w-24"
                    />
                    <p className="text-xs text-gray-500">
                      Lower numbers appear first in the carousel
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="image" className="space-y-4 mt-4">
                <div className="space-y-4">
                  {/* Current Image Preview */}
                  {formData.image && (
                    <div className="space-y-2">
                      <Label>Current Image</Label>
                      <div className="relative rounded-lg overflow-hidden bg-gray-100 aspect-[21/9]">
                        <img
                          src={formData.image}
                          alt="Banner preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Upload Button */}
                  <div className="space-y-2">
                    <Label>Banner Image *</Label>
                    <ImageUploadButton
                      onImageSelect={handleImageSelected}
                      currentImage={formData.image}
                    />
                    {errors.image && (
                      <p className="text-sm text-red-600">{errors.image}</p>
                    )}
                  </div>
                  
                  {/* Info */}
                  <div className="bg-blue-50 rounded-lg border border-blue-200 p-4 space-y-2">
                    <p className="font-medium text-sm text-blue-900">
                      Image Guidelines
                    </p>
                    <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                      <li>Recommended size: 1920 x 600 pixels</li>
                      <li>Aspect ratio: 21:9 (ultrawide)</li>
                      <li>Maximum file size: 5MB</li>
                      <li>Formats: JPG, PNG, WebP</li>
                      <li>Use high-quality images for best results</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Footer Actions */}
          <div className="flex-shrink-0 flex items-center justify-end gap-3 p-6 border-t bg-gray-50">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSaving}
              className="bg-red-500 hover:bg-red-600"
            >
              {isSaving ? 'Saving...' : isEditing ? 'Update Banner' : 'Create Banner'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Image Cropper Modal */}
      {showImageCropper && tempImageUrl && (
        <ImageCropperModal
          isOpen={showImageCropper}
          onClose={() => {
            setShowImageCropper(false)
            setTempImageUrl('')
          }}
          imageUrl={tempImageUrl}
          onCropComplete={handleCropComplete}
        />
      )}
    </>
  )
}
