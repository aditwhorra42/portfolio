import { ContactForm } from '@/components/contact/ContactForm'
import { Mail } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SocialLinks } from '@/components/layout/SocialLinks'

export const metadata = {
  title: 'Contact — Adit Whorra',
  description: 'Get in touch with Adit Whorra — for research collaborations, speaking, or general inquiries.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-brand-bg dark:bg-brand-bg-dark pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: heading + info */}
          <div className="flex flex-col gap-6 pt-2">
            <SectionHeading
              title="Get In Touch"
              subtitle="Whether you're working on something interesting, want to collaborate on research, or just want to say hello, my inbox is open."
            />

            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold uppercase tracking-widest text-brand-text-muted dark:text-brand-text-muted-dark">
                  Email
                </p>
                <a
                  href="mailto:aditwhorra@gmail.com"
                  className="inline-flex items-center gap-2 text-brand-accent dark:text-brand-accent-dark hover:text-brand-accent-hover dark:hover:text-brand-accent-hover-dark font-medium transition-colors duration-200 text-lg"
                >
                  <Mail size={20} />
                  aditwhorra@gmail.com
                </a>
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold uppercase tracking-widest text-brand-text-muted dark:text-brand-text-muted-dark">
                  Find me online
                </p>
                <SocialLinks size="md" />
              </div>

              <div className="flex flex-col gap-2 p-5 rounded-xl border border-brand-bg-muted dark:border-brand-bg-muted-dark bg-brand-bg-card dark:bg-brand-bg-card-dark">
                <p className="font-semibold text-brand-text dark:text-brand-text-dark">
                  Open to
                </p>
                <ul className="flex flex-col gap-1.5 text-sm text-brand-text-sec dark:text-brand-text-sec-dark">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-accent dark:bg-brand-accent-dark shrink-0" />
                    Research collaborations in AI/ML
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-accent dark:bg-brand-accent-dark shrink-0" />
                    Speaking and panel discussions
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-accent dark:bg-brand-accent-dark shrink-0" />
                    AI for social impact projects
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-accent dark:bg-brand-accent-dark shrink-0" />
                    Conversation about common interests and research
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right: contact form */}
          <div className="w-full">
            <ContactForm formspreeId="xreywjed" />
            <p className="mt-3 text-xs text-center text-brand-text-muted dark:text-brand-text-muted-dark">
              Alternatively, email me directly at{' '}
              <a
                href="mailto:aditwhorra@gmail.com"
                className="text-brand-accent dark:text-brand-accent-dark hover:underline"
              >
                aditwhorra@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
