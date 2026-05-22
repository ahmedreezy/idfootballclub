<template>
  <footer class="bg-navy-dark border-t border-white/10">
    <!-- Main Footer -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <!-- Brand Column -->
        <div class="lg:col-span-1">
          <div class="flex items-center gap-3 mb-4">
            <img
              :src="logoImg"
              alt="ID All Stars Football Club Logo"
              class="w-14 h-14 rounded-full object-cover border-2 border-gold/40"
            />
            <div>
              <p class="font-heading font-black text-white text-lg leading-tight">ID ALL STARS</p>
              <p class="font-body text-gold text-xs tracking-widest uppercase">Football Club</p>
            </div>
          </div>
          <p class="font-body text-white/55 text-sm leading-relaxed mb-5">
            Identifying Stars since 2010. Developing technically elite, tactically aware, and morally disciplined athletes in Manchester, UK.
          </p>
          <!-- Social Icons -->
          <div class="flex gap-3">
            <a
              v-for="social in socials"
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-gold hover:border-gold/40 hover:bg-gold/10 transition-all duration-200"
              :aria-label="social.name"
            >
              <svg viewBox="0 0 24 24" class="w-4 h-4" fill="currentColor" aria-hidden="true">
                <path :d="social.svgPath" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="font-heading font-bold text-white text-sm uppercase tracking-wider mb-5">Quick Links</h4>
          <ul class="space-y-2">
            <li v-for="link in navLinks" :key="link.id">
              <a
                href="#"
                @click.prevent="scrollTo(link.id)"
                class="font-body text-white/55 text-sm hover:text-gold transition-colors flex items-center gap-2 group"
              >
                <span class="w-1 h-1 rounded-full bg-gold/0 group-hover:bg-gold transition-colors flex-shrink-0"></span>
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Legal & Info -->
        <div>
          <h4 class="font-heading font-bold text-white text-sm uppercase tracking-wider mb-5">Legal & Policies</h4>
          <ul class="space-y-2">
            <li v-for="item in legalLinks" :key="item.label">
              <a
                href="#"
                @click.prevent="openModal(item.id)"
                class="font-body text-white/55 text-sm hover:text-gold transition-colors flex items-center gap-2 group"
              >
                <span class="w-1 h-1 rounded-full bg-gold/0 group-hover:bg-gold transition-colors flex-shrink-0"></span>
                {{ item.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h4 class="font-heading font-bold text-white text-sm uppercase tracking-wider mb-5">Contact</h4>
          <ul class="space-y-3">
            <li class="flex items-start gap-3">
              <span class="text-gold text-sm mt-0.5">✉️</span>
              <a href="mailto:id.footballstars@gmail.com" class="font-body text-white/55 text-sm hover:text-gold transition-colors break-all">
                id.footballstars@gmail.com
              </a>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-gold text-sm mt-0.5">📍</span>
              <span class="font-body text-white/55 text-sm">Manchester, United Kingdom</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-gold text-sm mt-0.5">⚽</span>
              <span class="font-body text-white/55 text-sm">Training · Mon–Sat</span>
            </li>
          </ul>

          <div class="mt-6">
            <button @click="scrollTo('register')" class="btn-primary text-sm px-6 py-2.5 w-full">
              Join the Academy
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Disclaimer Strip -->
    <div class="border-t border-white/10 bg-navy">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p class="font-body text-white/35 text-xs leading-relaxed text-center mb-3">
          <strong class="text-white/50">Disclaimer:</strong> ID All Stars Football Club is a private football academy.
          We are not affiliated with, endorsed by, or connected to any of the professional clubs mentioned on this website.
          References to professional clubs are made solely to identify clubs that players developed at our academy have gone on to represent.
          All trademarks, logos, and club names remain the property of their respective owners.
        </p>
        <div class="flex flex-wrap justify-center gap-x-6 gap-y-1 mb-4">
          <a
            v-for="item in legalLinks"
            :key="item.label"
            href="#"
            @click.prevent="openModal(item.id)"
            class="font-body text-white/35 text-xs hover:text-gold transition-colors"
          >
            {{ item.label }}
          </a>
        </div>
        <p class="font-body text-white/30 text-xs text-center">
          © {{ currentYear }} ID All Stars Football Club. All Rights Reserved. Manchester, United Kingdom.
        </p>
      </div>
    </div>

    <!-- Legal Modals -->
    <Transition enter-active-class="transition-all duration-300" enter-from-class="opacity-0" enter-to-class="opacity-100">
      <div
        v-if="activeModal"
        class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        @click.self="activeModal = null"
      >
        <div class="bg-navy border border-white/20 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8">
          <div class="flex items-center justify-between mb-6">
            <h3 class="font-heading font-bold text-xl text-white">{{ currentModalContent?.title }}</h3>
            <button @click="activeModal = null" class="text-white/50 hover:text-gold transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div class="font-body text-white/70 text-sm leading-relaxed space-y-4" v-html="currentModalContent?.content"></div>
          <p class="font-body text-white/35 text-xs mt-6 border-t border-white/10 pt-4">
            These are placeholder legal documents. Please consult a solicitor to finalise these before the website launches.
          </p>
        </div>
      </div>
    </Transition>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import logoImg from '../assets/newlogo.png.jpeg'

const currentYear = new Date().getFullYear()
const activeModal = ref<string | null>(null)

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Us' },
  { id: 'founder', label: 'Our Founder' },
  { id: 'vision', label: 'Vision & Mission' },
  { id: 'opportunities', label: 'ID Opportunities' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'register', label: 'Register a Player' },
  { id: 'contact', label: 'Contact Us' },
]

const legalLinks = [
  { id: 'privacy', label: 'Privacy Policy' },
  { id: 'terms', label: 'Terms & Conditions' },
  { id: 'safeguarding', label: 'Safeguarding Policy' },
  { id: 'disclaimer', label: 'Full Disclaimer' },
]

const modals: Record<string, { title: string; content: string }> = {
  privacy: {
    title: 'Privacy Policy',
    content: `
      <p><strong>Last updated: January 2026</strong></p>
      <p>ID All Stars Football Club ("we", "us", "our") is committed to protecting the privacy of our members, parents, and guardians. This policy explains how we collect, use, and protect personal data.</p>
      <p><strong>Data We Collect:</strong> Name, date of birth, contact information, guardian details, and training preferences collected via our registration forms.</p>
      <p><strong>How We Use Your Data:</strong> To manage academy membership, communicate updates, and comply with safeguarding obligations. We do not sell or share your data with third parties.</p>
      <p><strong>Data Retention:</strong> We retain registration data for the duration of a player's membership plus 3 years, after which it is securely deleted.</p>
      <p><strong>Your Rights:</strong> Under UK GDPR, you have the right to access, correct, or request deletion of your data. Contact us at id.footballstars@gmail.com.</p>
    `,
  },
  terms: {
    title: 'Terms & Conditions',
    content: `
      <p><strong>Effective: January 2026</strong></p>
      <p>By registering a player with ID All Stars Football Club, you agree to the following terms:</p>
      <p><strong>1. Registration:</strong> All information provided must be accurate. Players must be aged 4–21. Guardians must complete registration for players under 18.</p>
      <p><strong>2. Behaviour:</strong> All players and parents are expected to conduct themselves respectfully at all times. The club reserves the right to terminate membership for misconduct.</p>
      <p><strong>3. Attendance:</strong> Regular attendance is required. The club reserves the right to reassign places to players who miss consecutive sessions without notice.</p>
      <p><strong>4. Photography:</strong> Training sessions may be photographed or filmed for marketing purposes. Notify us if you wish to opt out.</p>
      <p><strong>5. Liability:</strong> ID All Stars is not liable for personal injury resulting from failure to follow coaching instructions. Players train at their own risk.</p>
    `,
  },
  safeguarding: {
    title: 'Safeguarding Policy',
    content: `
      <p><strong>ID All Stars Football Club is committed to the safety and wellbeing of all young players.</strong></p>
      <p>We follow FA Safeguarding guidelines and ensure all coaches and staff have valid DBS clearance and up-to-date safeguarding training.</p>
      <p><strong>Reporting Concerns:</strong> Any concerns about the welfare of a child should be reported immediately to our Designated Safeguarding Officer or directly to local social services / police.</p>
      <p><strong>Code of Conduct:</strong> All staff, volunteers, and parents must adhere to our code of conduct. Any behaviour that puts a child at risk will be reported to the appropriate authorities.</p>
    `,
  },
  disclaimer: {
    title: 'Full Disclaimer',
    content: `
      <p>ID All Stars Football Club is an independent private football academy based in Manchester, United Kingdom.</p>
      <p>We are not affiliated with, endorsed by, sponsored by, or in any way officially connected with Manchester City FC, Manchester United FC, Everton FC, Liverpool FC, or any other professional football club mentioned on this website.</p>
      <p>References to professional clubs are made solely to identify organisations that players who trained at our academy have gone on to represent at various points in their careers.</p>
      <p>All club names, badges, crests, and trademarks referenced remain the exclusive property of their respective owners.</p>
      <p>Results from our programmes vary by individual. We do not guarantee professional football placements.</p>
    `,
  },
}

const currentModalContent = computed(() =>
  activeModal.value ? modals[activeModal.value] : null
)

function openModal(id: string) {
  activeModal.value = id
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

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
