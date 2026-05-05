'use client';

// ============================================================
// SOBRE RUEDAS — Floating Chat Widget
// Burbuja multipropósito: WhatsApp + Agente IA
// ============================================================

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { MessageCircle, X, Bot, Send } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface FloatingChatWidgetProps {
  defaultMessage?: string;
}

export default function FloatingChatWidget({
  defaultMessage = '¡Hola! Me gustaría consultar sobre sus patines.',
}: FloatingChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappUrl = getWhatsAppUrl(defaultMessage);

  // Variantes para los botones secundarios
  const itemVariants = {
    closed: { opacity: 0, y: 20, scale: 0.8 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    })
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 no-print">
      
      {/* Opciones expandibles */}
      <AnimatePresence>
        {isOpen && (
          <div className="flex flex-col items-end gap-3 mb-2">
            
            {/* Opción 1: Agente IA */}
            <motion.div
              custom={1}
              variants={itemVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex items-center gap-3 group"
            >
              <span className="bg-white px-3 py-1.5 rounded-lg shadow-md text-xs font-bold text-sr-gray-700 opacity-0 group-hover:opacity-100 transition-opacity border border-sr-gray-100">
                Asistente IA
              </span>
              <button
                onClick={() => {
                  const srpBtn = document.getElementById('srp-chat-btn');
                  if (srpBtn) {
                    srpBtn.click();
                  } else {
                    console.warn('AI Agent widget not loaded yet');
                  }
                  setIsOpen(false);
                }}
                className="w-12 h-12 bg-[#D97230] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                title="Hablar con Alma"
              >
                <Bot size={24} />
              </button>
            </motion.div>

            {/* Opción 2: WhatsApp */}
            <motion.div
              custom={0}
              variants={itemVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex items-center gap-3 group"
            >
              <span className="bg-white px-3 py-1.5 rounded-lg shadow-md text-xs font-bold text-sr-gray-700 opacity-0 group-hover:opacity-100 transition-opacity border border-sr-gray-100">
                WhatsApp
              </span>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="w-12 h-12 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                title="Chat WhatsApp"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </motion.div>

          </div>
        )}
      </AnimatePresence>

      {/* FAB Principal */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: isOpen ? 1 : [1, 1.06, 1],
          opacity: 1 
        }}
        transition={{ 
          scale: isOpen 
            ? { type: 'spring', stiffness: 400, damping: 20 } 
            : { repeat: Infinity, duration: 3, ease: "easeInOut" },
          delay: isOpen ? 0 : 0.5
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 z-50 border",
          isOpen 
            ? "bg-sr-gray-800 text-white border-sr-gray-800" 
            : "bg-[#FFF5F0] text-[#D97230] border-[#FFDAB9]"
        )}
        aria-label={isOpen ? "Cerrar opciones" : "Abrir chat"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageCircle size={28} />
              {/* Badge de notificación sutil */}
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#D97230] rounded-full border-2 border-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

    </div>
  );
}

