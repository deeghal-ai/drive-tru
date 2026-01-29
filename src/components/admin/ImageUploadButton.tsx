'use client'

import { useRef, useState, ChangeEvent } from 'react'
import { Upload, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ImageUploadButtonProps {
  onImageSelect: (imageUrl: string) => void
  disabled?: boolean
  currentImage?: string
}

export function ImageUploadButton({ 
  onImageSelect, 
  disabled = false,
  currentImage
}: ImageUploadButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const handleClick = () => {
    inputRef.current?.click()
  }
  
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    
    setError(null)
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
      setError('Please select a valid image file (JPG, PNG, or WebP)')
      return
    }
    
    // Validate file size (max 5MB for demo)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      setError('Image size must be less than 5MB')
      return
    }
    
    setIsLoading(true)
    
    try {
      // TODO: Production - Upload to S3/CDN
      // For prototype, convert to data URL
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        setIsLoading(false)
        onImageSelect(imageUrl)
      }
      reader.onerror = () => {
        setIsLoading(false)
        setError('Failed to read image file')
      }
      reader.readAsDataURL(file)
    } catch (err) {
      setIsLoading(false)
      setError('Failed to process image')
    }
    
    // Reset input
    event.target.value = ''
  }
  
  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled || isLoading}
      />
      
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={handleClick}
          disabled={disabled || isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              {currentImage ? 'Change Image' : 'Upload Image'}
            </>
          )}
        </Button>
      </div>
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      
      <p className="text-xs text-gray-500">
        Accepted formats: JPG, PNG, WebP (Max 5MB)
      </p>
    </div>
  )
}
