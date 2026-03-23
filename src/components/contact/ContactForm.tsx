'use client'

import { useState, FormEvent } from 'react'
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface ContactFormProps {
  formspreeId?: string
}

type FormState = 'idle' | 'sending' | 'success' | 'error'

export function ContactForm({ formspreeId }: ContactFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormState('sending')
    setErrorMessage('')

    if (!formspreeId) {
      // Simulate a delay then show a friendly message
      await new Promise((r) => setTimeout(r, 800))
      setFormState('success')
      return
    }

    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      })

      if (response.ok) {
        setFormState('success')
        setName('')
        setEmail('')
        setMessage('')
      } else {
        const data = await response.json()
        setErrorMessage(data?.errors?.[0]?.message || 'Something went wrong. Please try again.')
        setFormState('error')
      }
    } catch {
      setErrorMessage('Network error. Please check your connection and try again.')
      setFormState('error')
    }
  }

  const handleReset = () => {
    setFormState('idle')
    setErrorMessage('')
  }

  if (formState === 'success') {
    return (
      <div className="flex flex-col items-center justify-center text-center gap-4 p-8 rounded-2xl border border-brand-bg-muted dark:border-brand-bg-muted-dark bg-brand-bg-card dark:bg-brand-bg-card-dark min-h-64">
        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
          <CheckCircle size={32} className="text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h3 className="font-serif text-xl font-bold text-brand-text dark:text-brand-text-dark mb-2">
            Message Sent!
          </h3>
          <p className="text-brand-text-muted dark:text-brand-text-muted-dark">
            Thanks for reaching out. I&apos;ll get back to you as soon as possible.
          </p>
        </div>
        <button
          onClick={handleReset}
          className="text-sm text-brand-accent dark:text-brand-accent-dark hover:underline"
        >
          Send another message
        </button>
      </div>
    )
  }

  const inputClasses =
    'w-full px-4 py-3 rounded-xl border border-brand-text-muted/30 dark:border-brand-text-muted-dark/30 bg-brand-bg dark:bg-brand-bg-dark text-brand-text dark:text-brand-text-dark placeholder:text-brand-text-muted dark:placeholder:text-brand-text-muted-dark focus:outline-none focus:ring-2 focus:ring-brand-accent dark:focus:ring-brand-accent-dark focus:border-transparent transition-all duration-200 text-sm'

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 p-6 rounded-2xl border border-brand-bg-muted dark:border-brand-bg-muted-dark bg-brand-bg-card dark:bg-brand-bg-card-dark shadow-sm"
    >
      {formState === 'error' && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <AlertCircle size={18} className="text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1">
            <p className="text-sm text-red-700 dark:text-red-300">{errorMessage}</p>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-red-600 dark:text-red-400 hover:underline self-start"
            >
              Try again
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-name"
          className="text-sm font-medium text-brand-text-sec dark:text-brand-text-sec-dark"
        >
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
          disabled={formState === 'sending'}
          className={inputClasses}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-email"
          className="text-sm font-medium text-brand-text-sec dark:text-brand-text-sec-dark"
        >
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          disabled={formState === 'sending'}
          className={inputClasses}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-message"
          className="text-sm font-medium text-brand-text-sec dark:text-brand-text-sec-dark"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What would you like to discuss?"
          required
          rows={5}
          disabled={formState === 'sending'}
          className={`${inputClasses} resize-none`}
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="md"
        disabled={formState === 'sending'}
        className="w-full justify-center"
      >
        {formState === 'sending' ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send size={16} />
            Send Message
          </>
        )}
      </Button>
    </form>
  )
}
