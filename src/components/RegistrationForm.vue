<template>
  <section id="register" class="py-24 bg-navy-dark relative overflow-hidden">
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(212,175,55,0.07),transparent_60%)]"></div>

    <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <p class="section-subheading mb-2">Take the First Step</p>
        <h2 class="section-heading">Player Registration</h2>
        <div class="gold-divider"></div>
        <p class="font-body text-white/60 mt-4 max-w-xl mx-auto">
          Fill in the form below to register your player. All fields marked with
          <span class="text-gold">*</span> are required.
        </p>
      </div>

      <!-- Success Message -->
      <Transition enter-active-class="transition-all duration-500" enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100">
        <div v-if="submitted" class="bg-green-900/40 border border-green-500/40 rounded-2xl p-8 text-center mb-8">
          <div class="text-5xl mb-4">🎉</div>
          <h3 class="font-heading font-bold text-2xl text-white mb-2">Registration Submitted!</h3>
          <p class="font-body text-white/70">Thank you! We'll be in touch within 24–48 hours to confirm your player's place.</p>
          <button @click="resetForm" class="btn-primary mt-6">Register Another Player</button>
        </div>
      </Transition>

      <!-- Form -->
      <form v-if="!submitted" @submit.prevent="handleSubmit" class="bg-navy rounded-3xl border border-white/10 p-6 md:p-10 shadow-2xl shadow-black/40" novalidate>
        <!-- Player Details -->
        <fieldset class="mb-8">
          <legend class="font-heading font-bold text-gold text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
            <span class="w-6 h-6 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold text-xs">1</span>
            Player Details
          </legend>
          <div class="grid sm:grid-cols-2 gap-5">
            <!-- First Name -->
            <div>
              <label class="input-label">First Name <span class="text-gold">*</span></label>
              <input
                v-model.trim="form.firstName"
                type="text"
                placeholder="e.g. Marcus"
                class="input-field"
                :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.firstName }"
                @blur="validateField('firstName')"
              />
              <p v-if="errors.firstName" class="input-error">{{ errors.firstName }}</p>
            </div>
            <!-- Last Name -->
            <div>
              <label class="input-label">Last Name <span class="text-gold">*</span></label>
              <input
                v-model.trim="form.lastName"
                type="text"
                placeholder="e.g. Johnson"
                class="input-field"
                :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.lastName }"
                @blur="validateField('lastName')"
              />
              <p v-if="errors.lastName" class="input-error">{{ errors.lastName }}</p>
            </div>
            <!-- DOB -->
            <div>
              <label class="input-label">Date of Birth <span class="text-gold">*</span></label>
              <input
                v-model="form.dob"
                type="date"
                :max="maxDob"
                :min="minDob"
                class="input-field"
                :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.dob }"
                @change="onDobChange"
              />
              <p v-if="errors.dob" class="input-error">{{ errors.dob }}</p>
            </div>
            <!-- Age (auto-calculated) -->
            <div>
              <label class="input-label">Age (Auto-calculated)</label>
              <input
                :value="calculatedAge !== null ? `${calculatedAge} years old` : ''"
                type="text"
                class="input-field opacity-70 cursor-not-allowed"
                readonly
                placeholder="Calculated from DOB"
              />
            </div>
            <!-- Gender -->
            <div>
              <label class="input-label">Gender <span class="text-gold">*</span></label>
              <select
                v-model="form.gender"
                class="input-field"
                :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.gender }"
                @blur="validateField('gender')"
              >
                <option value="" disabled>Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="prefer-not">Prefer not to say</option>
              </select>
              <p v-if="errors.gender" class="input-error">{{ errors.gender }}</p>
            </div>
            <!-- Playing Position -->
            <div>
              <label class="input-label">Preferred Position <span class="text-gold">*</span></label>
              <select
                v-model="form.position"
                class="input-field"
                :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.position }"
                @blur="validateField('position')"
              >
                <option value="" disabled>Select position</option>
                <option value="goalkeeper">Goalkeeper</option>
                <option value="defender">Defender</option>
                <option value="midfielder">Midfielder</option>
                <option value="forward">Forward / Striker</option>
                <option value="unsure">Not sure yet</option>
              </select>
              <p v-if="errors.position" class="input-error">{{ errors.position }}</p>
            </div>
          </div>
        </fieldset>

        <!-- Contact Details -->
        <fieldset class="mb-8">
          <legend class="font-heading font-bold text-gold text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
            <span class="w-6 h-6 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold text-xs">2</span>
            Contact Details
          </legend>
          <div class="grid sm:grid-cols-2 gap-5">
            <!-- Phone -->
            <div>
              <label class="input-label">Player / Parent Phone <span class="text-gold">*</span></label>
              <input
                v-model.trim="form.phone"
                type="tel"
                placeholder="+44 7700 900000"
                class="input-field"
                :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.phone }"
                @blur="validateField('phone')"
              />
              <p v-if="errors.phone" class="input-error">{{ errors.phone }}</p>
            </div>
            <!-- Email -->
            <div>
              <label class="input-label">Email Address <span class="text-gold">*</span></label>
              <input
                v-model.trim="form.email"
                type="email"
                placeholder="example@email.com"
                class="input-field"
                :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.email }"
                @blur="validateField('email')"
              />
              <p v-if="errors.email" class="input-error">{{ errors.email }}</p>
            </div>
            <!-- Residence -->
            <div>
              <label class="input-label">City / Town of Residence <span class="text-gold">*</span></label>
              <input
                v-model.trim="form.residence"
                type="text"
                placeholder="e.g. Manchester"
                class="input-field"
                :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.residence }"
                @blur="validateField('residence')"
              />
              <p v-if="errors.residence" class="input-error">{{ errors.residence }}</p>
            </div>
            <!-- Home Address -->
            <div class="sm:col-span-2">
              <label class="input-label">Home Address <span class="text-gold">*</span></label>
              <textarea
                v-model.trim="form.address"
                rows="2"
                placeholder="Full home address including postcode"
                class="input-field resize-none"
                :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.address }"
                @blur="validateField('address')"
              ></textarea>
              <p v-if="errors.address" class="input-error">{{ errors.address }}</p>
            </div>
          </div>
        </fieldset>

        <!-- Guardian Details (shown when under 18) -->
        <fieldset v-if="isUnder18" class="mb-8 border border-gold/20 rounded-2xl p-6">
          <legend class="font-heading font-bold text-gold text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
            <span class="w-6 h-6 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold text-xs">3</span>
            Guardian Details
            <span class="font-body text-gold/60 text-xs normal-case">(Required for players under 18)</span>
          </legend>
          <div class="grid sm:grid-cols-2 gap-5">
            <div>
              <label class="input-label">Guardian's Full Name <span class="text-gold">*</span></label>
              <input
                v-model.trim="form.guardianName"
                type="text"
                placeholder="Parent / Guardian name"
                class="input-field"
                :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.guardianName }"
                @blur="validateField('guardianName')"
              />
              <p v-if="errors.guardianName" class="input-error">{{ errors.guardianName }}</p>
            </div>
            <div>
              <label class="input-label">Guardian's Contact Number <span class="text-gold">*</span></label>
              <input
                v-model.trim="form.guardianContact"
                type="tel"
                placeholder="+44 7700 900000"
                class="input-field"
                :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.guardianContact }"
                @blur="validateField('guardianContact')"
              />
              <p v-if="errors.guardianContact" class="input-error">{{ errors.guardianContact }}</p>
            </div>
          </div>
        </fieldset>

        <!-- How did you hear about us -->
        <div class="mb-8">
          <label class="input-label">How did you hear about us?</label>
          <select v-model="form.referral" class="input-field">
            <option value="">Select an option</option>
            <option value="social-media">Social Media</option>
            <option value="friend">Friend / Family Referral</option>
            <option value="google">Google Search</option>
            <option value="event">Local Event / Trial</option>
            <option value="school">School</option>
            <option value="other">Other</option>
          </select>
        </div>

        <!-- Terms & Privacy -->
        <div class="mb-8 space-y-3">
          <label class="flex items-start gap-3 cursor-pointer group">
            <input
              v-model="form.terms"
              type="checkbox"
              class="w-5 h-5 mt-0.5 rounded border-white/20 bg-navy-light accent-gold flex-shrink-0 cursor-pointer"
              @change="validateField('terms')"
            />
            <span class="font-body text-white/65 text-sm leading-relaxed group-hover:text-white/80 transition-colors">
              I agree to the
              <a href="#" class="text-gold underline hover:text-gold-light">Terms & Conditions</a>
              and
              <a href="#" class="text-gold underline hover:text-gold-light">Privacy Policy</a>
              of ID All Stars Football Club. <span class="text-gold">*</span>
            </span>
          </label>
          <p v-if="errors.terms" class="input-error ml-8">{{ errors.terms }}</p>

          <label class="flex items-start gap-3 cursor-pointer group">
            <input
              v-model="form.marketing"
              type="checkbox"
              class="w-5 h-5 mt-0.5 rounded border-white/20 bg-navy-light accent-gold flex-shrink-0 cursor-pointer"
            />
            <span class="font-body text-white/65 text-sm leading-relaxed group-hover:text-white/80 transition-colors">
              I consent to receiving occasional updates, news, and offers from ID All Stars FC via email.
            </span>
          </label>
        </div>

        <!-- Submit -->
        <div class="flex flex-col sm:flex-row gap-4 items-center">
          <button
            type="submit"
            :disabled="submitting"
            class="btn-primary w-full sm:w-auto px-12 py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span v-if="submitting" class="flex items-center gap-2 justify-center">
              <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Submitting...
            </span>
            <span v-else>Submit Registration</span>
          </button>
          <p class="font-body text-white/40 text-xs text-center sm:text-left">
            We respect your privacy. Your data will never be sold or shared with third parties.
          </p>
        </div>

        <!-- Form error summary -->
        <p v-if="formError" class="mt-4 text-red-400 font-body text-sm text-center">{{ formError }}</p>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import emailjs from '@emailjs/browser'
import { EMAILJS_CONFIG } from '../lib/emailjs.config'

interface FormData {
  firstName: string
  lastName: string
  dob: string
  gender: string
  position: string
  phone: string
  email: string
  residence: string
  address: string
  guardianName: string
  guardianContact: string
  referral: string
  terms: boolean
  marketing: boolean
}

type FormErrors = Partial<Record<keyof FormData, string>>

const submitted = ref(false)
const submitting = ref(false)
const formError = ref('')

const form = ref<FormData>({
  firstName: '',
  lastName: '',
  dob: '',
  gender: '',
  position: '',
  phone: '',
  email: '',
  residence: '',
  address: '',
  guardianName: '',
  guardianContact: '',
  referral: '',
  terms: false,
  marketing: false,
})

const errors = ref<FormErrors>({})

const today = new Date()
const maxDob = new Date(today.getFullYear() - 4, today.getMonth(), today.getDate()).toISOString().split('T')[0]
const minDob = new Date(today.getFullYear() - 35, today.getMonth(), today.getDate()).toISOString().split('T')[0]

const calculatedAge = computed<number | null>(() => {
  if (!form.value.dob) return null
  const dob = new Date(form.value.dob)
  let age = today.getFullYear() - dob.getFullYear()
  const m = today.getMonth() - dob.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--
  return age
})

const isUnder18 = computed(() => calculatedAge.value !== null && calculatedAge.value < 18)

function onDobChange() {
  validateField('dob')
  if (isUnder18.value) {
    errors.value.guardianName = undefined
    errors.value.guardianContact = undefined
  }
}

const nameRegex = /^[A-Za-zÀ-ÿ\s'\-]{2,50}$/
const phoneRegex = /^[+\d\s\-()]{7,20}$/
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateField(field: keyof FormData): boolean {
  const v = form.value
  errors.value[field] = undefined

  switch (field) {
    case 'firstName':
      if (!v.firstName) { errors.value.firstName = 'First name is required.'; return false }
      if (!nameRegex.test(v.firstName)) { errors.value.firstName = 'First name must be 2–50 letters only.'; return false }
      break
    case 'lastName':
      if (!v.lastName) { errors.value.lastName = 'Last name is required.'; return false }
      if (!nameRegex.test(v.lastName)) { errors.value.lastName = 'Last name must be 2–50 letters only.'; return false }
      break
    case 'dob':
      if (!v.dob) { errors.value.dob = 'Date of birth is required.'; return false }
      if (calculatedAge.value === null || calculatedAge.value < 4) { errors.value.dob = 'Player must be at least 4 years old.'; return false }
      if (calculatedAge.value > 35) { errors.value.dob = 'Please enter a valid date of birth.'; return false }
      break
    case 'gender':
      if (!v.gender) { errors.value.gender = 'Please select a gender.'; return false }
      break
    case 'position':
      if (!v.position) { errors.value.position = 'Please select a position.'; return false }
      break
    case 'phone':
      if (!v.phone) { errors.value.phone = 'Phone number is required.'; return false }
      if (!phoneRegex.test(v.phone)) { errors.value.phone = 'Please enter a valid phone number.'; return false }
      break
    case 'email':
      if (!v.email) { errors.value.email = 'Email address is required.'; return false }
      if (!emailRegex.test(v.email)) { errors.value.email = 'Please enter a valid email address.'; return false }
      break
    case 'residence':
      if (!v.residence) { errors.value.residence = 'City / town is required.'; return false }
      break
    case 'address':
      if (!v.address) { errors.value.address = 'Home address is required.'; return false }
      if (v.address.length < 10) { errors.value.address = 'Please enter a full address including postcode.'; return false }
      break
    case 'guardianName':
      if (isUnder18.value && !v.guardianName) { errors.value.guardianName = 'Guardian name is required for players under 18.'; return false }
      if (v.guardianName && !nameRegex.test(v.guardianName)) { errors.value.guardianName = 'Please enter a valid name.'; return false }
      break
    case 'guardianContact':
      if (isUnder18.value && !v.guardianContact) { errors.value.guardianContact = 'Guardian contact is required for players under 18.'; return false }
      if (v.guardianContact && !phoneRegex.test(v.guardianContact)) { errors.value.guardianContact = 'Please enter a valid phone number.'; return false }
      break
    case 'terms':
      if (!v.terms) { errors.value.terms = 'You must agree to the Terms & Conditions to proceed.'; return false }
      break
  }
  return true
}

function validateAll(): boolean {
  const fields: (keyof FormData)[] = ['firstName', 'lastName', 'dob', 'gender', 'position', 'phone', 'email', 'residence', 'address', 'terms']
  if (isUnder18.value) {
    fields.push('guardianName', 'guardianContact')
  }
  return fields.map(f => validateField(f)).every(Boolean)
}

async function handleSubmit() {
  formError.value = ''
  if (!validateAll()) {
    formError.value = 'Please correct the errors above before submitting.'
    return
  }

  const submittedAt = new Date().toLocaleString('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Europe/London',
  })
  const registrationId = `REG-${Date.now()}`

  submitting.value = true
  try {
    await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.REGISTRATION_TEMPLATE_ID,
      {
        to_email: EMAILJS_CONFIG.TO_EMAIL,
        player_name: `${form.value.firstName} ${form.value.lastName}`,
        reply_to: form.value.email,
        dob: form.value.dob,
        age: calculatedAge.value,
        gender: form.value.gender,
        position: form.value.position,
        phone: form.value.phone,
        email: form.value.email,
        residence: form.value.residence,
        address: form.value.address,
        guardian_name: form.value.guardianName || 'N/A',
        guardian_contact: form.value.guardianContact || 'N/A',
        referral: form.value.referral || 'Not specified',
        marketing_consent: form.value.marketing ? 'Yes' : 'No',
        registration_id: registrationId,
        submitted_at: submittedAt,
        email_subject: `New Player Registration - ${form.value.firstName} ${form.value.lastName} - Age ${calculatedAge.value ?? 'N/A'}`,
        email_html: `
          <h2 style="margin:0 0 12px;color:#0F1B4C;">New Player Registration</h2>
          <p style="margin:0 0 14px;"><strong>Registration ID:</strong> ${registrationId}</p>
          <h3 style="margin:12px 0 6px;color:#0F1B4C;">Player Details</h3>
          <p style="margin:0 0 6px;"><strong>Name:</strong> ${form.value.firstName} ${form.value.lastName}</p>
          <p style="margin:0 0 6px;"><strong>DOB:</strong> ${form.value.dob}</p>
          <p style="margin:0 0 6px;"><strong>Age:</strong> ${calculatedAge.value ?? 'N/A'}</p>
          <p style="margin:0 0 6px;"><strong>Gender:</strong> ${form.value.gender}</p>
          <p style="margin:0 0 10px;"><strong>Position:</strong> ${form.value.position}</p>
          <h3 style="margin:12px 0 6px;color:#0F1B4C;">Contact Details</h3>
          <p style="margin:0 0 6px;"><strong>Email:</strong> ${form.value.email}</p>
          <p style="margin:0 0 6px;"><strong>Phone:</strong> ${form.value.phone}</p>
          <p style="margin:0 0 6px;"><strong>Residence:</strong> ${form.value.residence}</p>
          <p style="margin:0 0 10px;"><strong>Address:</strong> ${form.value.address}</p>
          <h3 style="margin:12px 0 6px;color:#0F1B4C;">Safeguarding & Notes</h3>
          <p style="margin:0 0 6px;"><strong>Guardian Name:</strong> ${form.value.guardianName || 'N/A'}</p>
          <p style="margin:0 0 6px;"><strong>Guardian Contact:</strong> ${form.value.guardianContact || 'N/A'}</p>
          <p style="margin:0 0 6px;"><strong>Referral:</strong> ${form.value.referral || 'Not specified'}</p>
          <p style="margin:0 0 6px;"><strong>Marketing Consent:</strong> ${form.value.marketing ? 'Yes' : 'No'}</p>
          <p style="margin:14px 0 0;color:#666;"><strong>Submitted:</strong> ${submittedAt}</p>
        `,
      },
      EMAILJS_CONFIG.PUBLIC_KEY,
    )
    submitted.value = true
  } catch {
    formError.value = `Something went wrong. Please email us directly at ${EMAILJS_CONFIG.TO_EMAIL} or try again.`
  } finally {
    submitting.value = false
  }
}

function resetForm() {
  submitted.value = false
  form.value = {
    firstName: '', lastName: '', dob: '', gender: '', position: '',
    phone: '', email: '', residence: '', address: '',
    guardianName: '', guardianContact: '', referral: '', terms: false, marketing: false,
  }
  errors.value = {}
}
</script>
