<template>
  <section id="contact" class="py-24 bg-navy relative overflow-hidden">
    <div class="absolute inset-0">
      <img
        src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1920&q=80"
        alt=""
        class="w-full h-full object-cover opacity-5"
      />
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-16">
        <p class="section-subheading mb-2">Get In Touch</p>
        <h2 class="section-heading">Contact Us</h2>
        <div class="gold-divider"></div>
      </div>

      <div class="grid lg:grid-cols-5 gap-12">
        <!-- Contact Info -->
        <div class="lg:col-span-2 space-y-8">
          <div>
            <h3 class="font-heading font-bold text-xl text-white mb-6">Get In Touch</h3>
            <div class="space-y-5">
              <div v-for="info in contactInfo" :key="info.label" class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                  <span class="text-gold text-lg">{{ info.icon }}</span>
                </div>
                <div>
                  <p class="font-heading font-semibold text-white/60 text-xs uppercase tracking-wider mb-0.5">{{ info.label }}</p>
                  <a
                    v-if="info.href"
                    :href="info.href"
                    class="font-body text-white hover:text-gold transition-colors"
                  >{{ info.value }}</a>
                  <p v-else class="font-body text-white">{{ info.value }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Social Links -->
          <div>
            <h4 class="font-heading font-semibold text-white/60 text-xs uppercase tracking-wider mb-4">Follow Us</h4>
            <div class="flex gap-3">
              <a
                v-for="social in socials"
                :key="social.name"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-gold hover:border-gold/40 hover:bg-gold/10 transition-all duration-200"
                :aria-label="social.name"
              >
                <svg viewBox="0 0 24 24" class="w-5 h-5" fill="currentColor" aria-hidden="true">
                  <path :d="social.svgPath" />
                </svg>
              </a>
            </div>
          </div>

          <!-- Map placeholder -->
          <div class="rounded-2xl overflow-hidden border border-white/10 bg-navy-dark h-48 flex items-center justify-center">
            <div class="text-center">
              <span class="text-3xl block mb-2">📍</span>
              <p class="font-heading font-semibold text-white text-sm">Manchester</p>
              <p class="font-body text-white/50 text-xs">United Kingdom</p>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="lg:col-span-3">
          <Transition
            enter-active-class="transition-all duration-500"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
          >
            <div v-if="submitted" class="bg-green-900/40 border border-green-500/40 rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center">
              <div class="text-5xl mb-4">✅</div>
              <h3 class="font-heading font-bold text-2xl text-white mb-2">Message Received!</h3>
              <p class="font-body text-white/70 max-w-sm">Thank you for reaching out. We'll respond within 24–48 hours.</p>
              <button @click="submitted = false" class="btn-outline-gold mt-6">Send Another Message</button>
            </div>
          </Transition>

          <form v-if="!submitted" @submit.prevent="handleSubmit" class="bg-navy-dark rounded-3xl border border-white/10 p-6 md:p-8" novalidate>
            <div class="grid sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label class="input-label">Full Name <span class="text-gold">*</span></label>
                <input
                  v-model.trim="form.name"
                  type="text"
                  placeholder="Your full name"
                  class="input-field"
                  :class="{ 'border-red-500': errors.name }"
                  @blur="validate('name')"
                />
                <p v-if="errors.name" class="input-error">{{ errors.name }}</p>
              </div>
              <div>
                <label class="input-label">Email Address <span class="text-gold">*</span></label>
                <input
                  v-model.trim="form.email"
                  type="email"
                  placeholder="your@email.com"
                  class="input-field"
                  :class="{ 'border-red-500': errors.email }"
                  @blur="validate('email')"
                />
                <p v-if="errors.email" class="input-error">{{ errors.email }}</p>
              </div>
            </div>
            <div class="mb-5">
              <label class="input-label">Phone Number</label>
              <input
                v-model.trim="form.phone"
                type="tel"
                placeholder="+44 7700 900000"
                class="input-field"
                :class="{ 'border-red-500': errors.phone }"
                @blur="validate('phone')"
              />
              <p v-if="errors.phone" class="input-error">{{ errors.phone }}</p>
            </div>
            <div class="mb-5">
              <label class="input-label">Subject</label>
              <select v-model="form.subject" class="input-field">
                <option value="">Select a subject</option>
                <option value="registration">Player Registration Enquiry</option>
                <option value="trial">Request a Trial</option>
                <option value="franchise">Franchise / Partnership</option>
                <option value="media">Media / Press</option>
                <option value="general">General Enquiry</option>
              </select>
            </div>
            <div class="mb-6">
              <label class="input-label">Message <span class="text-gold">*</span></label>
              <textarea
                v-model.trim="form.message"
                rows="5"
                placeholder="Tell us how we can help..."
                class="input-field resize-none"
                :class="{ 'border-red-500': errors.message }"
                @blur="validate('message')"
              ></textarea>
              <p v-if="errors.message" class="input-error">{{ errors.message }}</p>
            </div>
            <button
              type="submit"
              :disabled="submitting"
              class="btn-primary w-full py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span v-if="submitting" class="flex items-center gap-2 justify-center">
                <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Sending...
              </span>
              <span v-else>Send Message</span>
            </button>
            <p v-if="formError" class="mt-3 text-red-400 font-body text-sm text-center">{{ formError }}</p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import emailjs from '@emailjs/browser'
import { EMAILJS_CONFIG } from '../lib/emailjs.config'

interface ContactForm {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

type ContactErrors = Partial<Record<keyof ContactForm, string>>

const submitted = ref(false)
const submitting = ref(false)
const formError = ref('')

const form = ref<ContactForm>({ name: '', email: '', phone: '', subject: '', message: '' })
const errors = ref<ContactErrors>({})

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRegex = /^[+\d\s\-()]{7,20}$/

function validate(field: keyof ContactForm): boolean {
  errors.value[field] = undefined
  const v = form.value
  switch (field) {
    case 'name':
      if (!v.name) { errors.value.name = 'Name is required.'; return false }
      if (v.name.length < 2) { errors.value.name = 'Name is too short.'; return false }
      break
    case 'email':
      if (!v.email) { errors.value.email = 'Email is required.'; return false }
      if (!emailRegex.test(v.email)) { errors.value.email = 'Please enter a valid email.'; return false }
      break
    case 'phone':
      if (v.phone && !phoneRegex.test(v.phone)) { errors.value.phone = 'Please enter a valid phone number.'; return false }
      break
    case 'message':
      if (!v.message) { errors.value.message = 'Message is required.'; return false }
      if (v.message.length < 10) { errors.value.message = 'Message is too short.'; return false }
      break
  }
  return true
}

async function handleSubmit() {
  formError.value = ''
  const valid = (['name', 'email', 'phone', 'message'] as (keyof ContactForm)[]).map(f => validate(f)).every(Boolean)
  if (!valid) { formError.value = 'Please fix the errors above.'; return }

  const submittedAt = new Date().toLocaleString('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Europe/London',
  })
  const enquiryId = `ENQ-${Date.now()}`
  const fullSubject = form.value.subject || 'General Enquiry'

  submitting.value = true
  try {
    await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.CONTACT_TEMPLATE_ID,
      {
        to_email: EMAILJS_CONFIG.TO_EMAIL,
        from_name: form.value.name,
        from_email: form.value.email,
        reply_to: form.value.email,
        phone: form.value.phone || 'Not provided',
        subject: fullSubject,
        message: form.value.message,
        enquiry_id: enquiryId,
        submitted_at: submittedAt,
        email_subject: `New Contact Enquiry - ${fullSubject} - ${form.value.name}`,
        email_html: `
          <h2 style="margin:0 0 12px;color:#0F1B4C;">New Contact Enquiry</h2>
          <p style="margin:0 0 14px;"><strong>Enquiry ID:</strong> ${enquiryId}</p>
          <p style="margin:0 0 6px;"><strong>Name:</strong> ${form.value.name}</p>
          <p style="margin:0 0 6px;"><strong>Email:</strong> ${form.value.email}</p>
          <p style="margin:0 0 6px;"><strong>Phone:</strong> ${form.value.phone || 'Not provided'}</p>
          <p style="margin:0 0 14px;"><strong>Subject:</strong> ${fullSubject}</p>
          <p style="margin:0 0 6px;"><strong>Message:</strong></p>
          <div style="background:#F8F8F8;border-left:4px solid #D4AF37;padding:10px 12px;white-space:pre-wrap;">${form.value.message}</div>
          <p style="margin:14px 0 0;color:#666;"><strong>Submitted:</strong> ${submittedAt}</p>
        `,
      },
      EMAILJS_CONFIG.PUBLIC_KEY,
    )
    submitted.value = true
  } catch {
    formError.value = `Something went wrong. Please email us at ${EMAILJS_CONFIG.TO_EMAIL}`
  } finally {
    submitting.value = false
  }
}

const contactInfo = [
  { label: 'Email', icon: '✉️', value: EMAILJS_CONFIG.TO_EMAIL, href: `mailto:${EMAILJS_CONFIG.TO_EMAIL}` },
  { label: 'Location', icon: '📍', value: 'Manchester, United Kingdom', href: null },
  { label: 'Training Hours', icon: '⏰', value: 'Mon–Sat · Various times by age group', href: null },
]

const socials = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/idallstarsfootballclub?igsh=MWx3azZ4Nm90bG91',
    svgPath: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  },
  {
    name: 'TikTok',
    url: '#',
    svgPath: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
  },
  {
    name: 'YouTube',
    url: '#',
    svgPath: 'M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z',
  },
  {
    name: 'Facebook',
    url: '#',
    svgPath: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  },
]
</script>
