<template>
  <nav
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled ? 'bg-navy-dark/95 backdrop-blur-md shadow-lg shadow-black/30' : 'bg-transparent',
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-24">
        <!-- Logo -->
        <a href="#home" @click.prevent="scrollTo('home')" class="flex items-center gap-3 group">
          <div class="relative w-20 h-20 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            <img
              v-for="key in logoKeys"
              :key="key"
              :src="logoSrc[key]"
              alt="ID All Stars Football Club Logo"
              :class="[
                'absolute inset-0 w-20 h-20 rounded-full object-cover border-4 border-gold/60 shadow-lg shadow-gold/20 transition-opacity duration-500',
                activeLogo === key ? 'opacity-100' : 'opacity-0'
              ]"
            />
          </div>
          <div class="block">
            <p class="font-heading font-black text-sm sm:text-lg leading-tight drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]" style="color:#ffffff">ID ALL STARS</p>
            <p class="font-body text-gold text-[10px] sm:text-xs tracking-widest uppercase drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">Football Club</p>
          </div>
        </a>

        <!-- Desktop Nav -->
        <div class="hidden lg:flex items-center gap-1">
          <a
            v-for="link in navLinks"
            :key="link.id"
            href="#"
            @click.prevent="scrollTo(link.id)"
            :class="[
              'px-4 py-2 rounded-lg font-heading font-semibold text-sm transition-all duration-200',
              activeSection === link.id
                ? 'text-gold bg-gold/10'
                : 'text-white/80 hover:text-gold hover:bg-white/5',
            ]"
          >
            {{ link.label }}
          </a>
          <a
            href="#"
            @click.prevent="scrollTo('register')"
            class="ml-4 btn-primary text-sm px-6 py-2.5"
          >
            Join Academy
          </a>
        </div>

        <!-- Mobile Hamburger -->
        <button
          @click="mobileOpen = !mobileOpen"
          class="lg:hidden p-2 rounded-lg text-white hover:text-gold hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          <svg v-if="!mobileOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <Transition
      enter-active-class="transition-all duration-300"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="mobileOpen"
        class="lg:hidden bg-navy-dark/98 backdrop-blur-md border-t border-white/10"
      >
        <div class="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-2">
          <a
            v-for="link in navLinks"
            :key="link.id"
            href="#"
            @click.prevent="mobileNav(link.id)"
            :class="[
              'px-4 py-3 rounded-lg font-heading font-semibold text-base transition-all duration-200',
              activeSection === link.id
                ? 'text-gold bg-gold/10 border-l-4 border-gold pl-3'
                : 'text-white/80 hover:text-gold hover:bg-white/5',
            ]"
          >
            {{ link.label }}
          </a>
          <a
            href="#"
            @click.prevent="mobileNav('register')"
            class="btn-primary mt-4 text-center"
          >
            Join the Academy
          </a>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import whiteLogo from '../assets/whitelogo.jpg.png'
import blackLogo from '../assets/black-logo.jpg.png'
import goldLogo from '../assets/gold-logo.jpg.png'
import { useKitTheme } from '../lib/useKitTheme'

const logoKeys = ['white', 'black', 'gold'] as const
type LogoKey = typeof logoKeys[number]

const logoSrc: Record<LogoKey, string> = { white: whiteLogo, black: blackLogo, gold: goldLogo }

const { isLightMode } = useKitTheme()

const scrolled = ref(false)
const mobileOpen = ref(false)
const activeSection = ref('home')

// 'white' | 'black' | 'gold' — resolved on every scroll tick
const activeLogo = ref<LogoKey>('white')

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Us' },
  { id: 'founder', label: 'Our Founder' },
  { id: 'vision', label: 'Vision & Mission' },
  { id: 'opportunities', label: 'ID Opportunities' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact Us' },
]

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  if (id === 'home') {
    window.dispatchEvent(new CustomEvent('idfc:replay-home'))
  }
  mobileOpen.value = false
}

function mobileNav(id: string) {
  mobileOpen.value = false
  setTimeout(() => scrollTo(id), 100)
}

function onScroll() {
  scrolled.value = window.scrollY > 30

  const sectionIds = ['home', 'about', 'founder', 'vision', 'opportunities', 'gallery', 'register', 'contact']
  for (const id of [...sectionIds].reverse()) {
    const el = document.getElementById(id)
    if (el) {
      const rect = el.getBoundingClientRect()
      if (rect.top <= 100) {
        activeSection.value = id
        break
      }
    }
  }

  // In light kit mode every section background is cream → always black logo.
  // In dark kit mode, switch to black only over the gold StatsBar.
  if (isLightMode.value) {
    activeLogo.value = 'black'
    return
  }
  const NAVBAR_H = 96
  const lightSectionSelectors = ['.stats-section'] // gold backgrounds
  let overLight = false
  for (const sel of lightSectionSelectors) {
    const el = document.querySelector(sel) as HTMLElement | null
    if (el) {
      const r = el.getBoundingClientRect()
      if (r.top < NAVBAR_H && r.bottom > 0) {
        overLight = true
        break
      }
    }
  }
  activeLogo.value = overLight ? 'black' : 'white'
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>
