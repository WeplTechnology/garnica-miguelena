'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'motion/react'
import { Send, Check, AlertCircle } from 'lucide-react'

type FormData = {
  name: string
  email: string
  phone: string
  message: string
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactForm() {
  const t = useTranslations('contact.form')
  const [status, setStatus] = useState<FormStatus>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setStatus('submitting')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setStatus('success')
      reset()

      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-xs tracking-widest uppercase text-dark-muted mb-2">
          {t('name')} *
        </label>
        <input
          type="text"
          id="name"
          {...register('name', { required: true })}
          className={`w-full px-0 py-3 bg-transparent border-b-2 transition-colors duration-300 focus:outline-none ${
            errors.name
              ? 'border-red-500 focus:border-red-500'
              : 'border-sand-300 focus:border-dark'
          }`}
          placeholder="Tu nombre"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-xs tracking-widest uppercase text-dark-muted mb-2">
          {t('email')} *
        </label>
        <input
          type="email"
          id="email"
          {...register('email', {
            required: true,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          })}
          className={`w-full px-0 py-3 bg-transparent border-b-2 transition-colors duration-300 focus:outline-none ${
            errors.email
              ? 'border-red-500 focus:border-red-500'
              : 'border-sand-300 focus:border-dark'
          }`}
          placeholder="email@ejemplo.com"
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-xs tracking-widest uppercase text-dark-muted mb-2">
          {t('phone')}
        </label>
        <input
          type="tel"
          id="phone"
          {...register('phone')}
          className="w-full px-0 py-3 bg-transparent border-b-2 border-sand-300 focus:border-dark transition-colors duration-300 focus:outline-none"
          placeholder="+34 600 000 000"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-xs tracking-widest uppercase text-dark-muted mb-2">
          {t('message')} *
        </label>
        <textarea
          id="message"
          rows={5}
          {...register('message', { required: true })}
          className={`w-full px-0 py-3 bg-transparent border-b-2 transition-colors duration-300 focus:outline-none resize-none ${
            errors.message
              ? 'border-red-500 focus:border-red-500'
              : 'border-sand-300 focus:border-dark'
          }`}
          placeholder="Cuéntanos sobre tu proyecto..."
        />
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="btn-primary w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? (
            <>
              <span className="animate-pulse">{t('sending')}</span>
            </>
          ) : (
            <>
              {t('submit')}
              <Send className="w-4 h-4 ml-2" />
            </>
          )}
        </button>
      </div>

      {/* Status Messages */}
      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 p-4 bg-olive-100 text-olive-800 rounded"
          >
            <Check className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">{t('success')}</p>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 p-4 bg-terracotta-100 text-terracotta-800 rounded"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">{t('error')}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  )
}
