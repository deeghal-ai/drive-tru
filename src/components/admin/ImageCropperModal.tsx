'use client'

import { useState, useRef, useEffect } from 'react'
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { X, RotateCw, FlipHorizontal, FlipVertical, ZoomIn, ZoomOut, RefreshCw } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'

interface ImageCropperModalProps {
  isOpen: boolean
  onClose: () => void
  imageUrl: string
  onCropComplete: (croppedImageUrl: string) => void
  aspectRatio?: number
}

export function ImageCropperModal({
  isOpen,
  onClose,
  imageUrl,
  onCropComplete,
  aspectRatio = 21 / 9 // Banner aspect ratio
}: ImageCropperModalProps) {
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 90,
    height: 90,
    x: 5,
    y: 5
  })
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null)
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [flipH, setFlipH] = useState(false)
  const [flipV, setFlipV] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  const resetTransforms = () => {
    setZoom(1)
    setRotation(0)
    setFlipH(false)
    setFlipV(false)
    setCrop({
      unit: '%',
      width: 90,
      height: 90,
      x: 5,
      y: 5
    })
  }
  
  const rotate90 = () => {
    setRotation((prev) => (prev + 90) % 360)
  }
  
  useEffect(() => {
    if (!completedCrop || !imgRef.current || !canvasRef.current) {
      return
    }
    
    const image = imgRef.current
    const canvas = canvasRef.current
    const crop = completedCrop
    
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    const ctx = canvas.getContext('2d')
    
    if (!ctx) return
    
    const pixelRatio = window.devicePixelRatio || 1
    
    canvas.width = crop.width * pixelRatio * scaleX
    canvas.height = crop.height * pixelRatio * scaleY
    
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    ctx.imageSmoothingQuality = 'high'
    
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    )
  }, [completedCrop])
  
  const handleApplyCrop = async () => {
    if (!canvasRef.current || !completedCrop) {
      onCropComplete(imageUrl)
      return
    }
    
    // TODO: Production - Upload to S3/CDN and return real URL
    // For prototype, convert canvas to data URL
    const croppedImageUrl = canvasRef.current.toDataURL('image/jpeg', 0.95)
    onCropComplete(croppedImageUrl)
    onClose()
  }
  
  const getDimensions = () => {
    if (!completedCrop || !imgRef.current) return '0 x 0 px'
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height
    const width = Math.round(completedCrop.width * scaleX)
    const height = Math.round(completedCrop.height * scaleY)
    return `${width} x ${height} px`
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center justify-between">
            <span>Crop & Resize Banner Image</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
            {/* Main Crop Area */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-gray-100 rounded-lg p-4 min-h-[400px] flex items-center justify-center">
                <ReactCrop
                  crop={crop}
                  onChange={(c) => setCrop(c)}
                  onComplete={(c) => setCompletedCrop(c)}
                  aspect={aspectRatio}
                >
                  <img
                    ref={imgRef}
                    src={imageUrl}
                    alt="Crop preview"
                    style={{
                      transform: `scale(${zoom}) rotate(${rotation}deg) scaleX(${flipH ? -1 : 1}) scaleY(${flipV ? -1 : 1})`,
                      transition: 'transform 0.2s',
                      maxHeight: '500px',
                      maxWidth: '100%'
                    }}
                  />
                </ReactCrop>
              </div>
              
              {/* Zoom Control */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Zoom</label>
                  <span className="text-sm text-gray-500">{Math.round(zoom * 100)}%</span>
                </div>
                <div className="flex items-center gap-3">
                  <ZoomOut className="w-4 h-4 text-gray-500" />
                  <Slider
                    value={[zoom]}
                    onValueChange={(value) => setZoom(value[0])}
                    min={0.5}
                    max={3}
                    step={0.1}
                    className="flex-1"
                  />
                  <ZoomIn className="w-4 h-4 text-gray-500" />
                </div>
              </div>
            </div>
            
            {/* Controls & Preview */}
            <div className="space-y-4">
              {/* Transform Controls */}
              <div className="bg-white rounded-lg border p-4 space-y-3">
                <h3 className="font-semibold text-sm">Transform</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={rotate90}
                    className="w-full"
                  >
                    <RotateCw className="w-4 h-4 mr-2" />
                    Rotate
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFlipH(!flipH)}
                    className="w-full"
                  >
                    <FlipHorizontal className="w-4 h-4 mr-2" />
                    Flip H
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFlipV(!flipV)}
                    className="w-full col-span-2"
                  >
                    <FlipVertical className="w-4 h-4 mr-2" />
                    Flip Vertical
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetTransforms}
                    className="w-full col-span-2"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reset All
                  </Button>
                </div>
              </div>
              
              {/* Preview */}
              <div className="bg-white rounded-lg border p-4 space-y-3">
                <h3 className="font-semibold text-sm">Preview</h3>
                <div className="bg-gray-100 rounded overflow-hidden aspect-[21/9]">
                  <canvas
                    ref={canvasRef}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-xs text-gray-500 text-center">
                  Dimensions: {getDimensions()}
                </div>
              </div>
              
              {/* Info */}
              <div className="bg-blue-50 rounded-lg border border-blue-200 p-3 text-sm text-blue-800">
                <p className="font-medium mb-1">Recommended Size</p>
                <p className="text-xs">1920 x 600 pixels for best quality</p>
                <p className="text-xs mt-2">Aspect Ratio: 21:9</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer Actions */}
        <div className="flex-shrink-0 flex items-center justify-end gap-3 p-4 border-t bg-gray-50">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            onClick={handleApplyCrop}
            className="bg-red-500 hover:bg-red-600"
          >
            Apply Crop
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
