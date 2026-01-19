'use client'

import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { LeadCaptureModal } from '@/components/forms/LeadCaptureModal'
import { cn } from '@/lib/utils'

interface FloatingWhatsAppProps {
  locale: string
}

export function FloatingWhatsApp({ locale }: FloatingWhatsAppProps) {
  const [showModal, setShowModal] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  
  const isArabic = locale === 'ar'
  const tooltipText = isArabic ? 'تواصل معنا عبر واتساب' : 'Chat with us on WhatsApp'
  
  return (
    <>
      {/* Floating Button */}
      <div 
        className={cn(
          "fixed bottom-6 z-50 flex items-center gap-3",
          isArabic ? "left-6" : "right-6"
        )}
      >
        {/* Tooltip */}
        <div 
          className={cn(
            "bg-white px-4 py-2 rounded-full shadow-lg text-sm font-medium text-gray-700 transition-all duration-300",
            isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none",
            isArabic && "translate-x-0"
          )}
        >
          {tooltipText}
        </div>
        
        {/* WhatsApp Button */}
        <button
          onClick={() => setShowModal(true)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={cn(
            "w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg flex items-center justify-center",
            "hover:bg-[#20BD5A] hover:scale-110 transition-all duration-300",
            "animate-bounce-subtle"
          )}
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-7 h-7" fill="white" />
        </button>
      </div>
      
      {/* Pulse animation ring */}
      <style jsx global>{`
        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
        
        @keyframes pulse-ring {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
      
      {/* Lead Capture Modal */}
      <LeadCaptureModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        type="whatsapp"
        locale={locale}
        redirectToWhatsApp={true}
        whatsAppMessage="Hi, I'm interested in learning more about your pre-owned cars."
      />
    </>
  )
}
