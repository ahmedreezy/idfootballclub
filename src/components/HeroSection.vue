<template>
  <section
    id="home"
    class="relative min-h-screen flex items-center justify-center overflow-hidden"
  >
    <!-- Background Image -->
    <div class="absolute inset-0">
      <img
        :src="heroImg"
        alt="ID All Stars Football Club"
        class="w-full h-full object-cover object-center"
      />
      <!-- Dark overlay gradient -->
      <div class="absolute inset-0 bg-gradient-to-b from-navy-dark/80 via-navy-dark/70 to-navy-dark"></div>
      <!-- Gold shimmer line -->
      <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
    </div>

    <!-- Floating badge -->
    <div class="absolute top-32 right-8 md:right-16 hidden md:flex flex-col items-center">
      <div class="w-24 h-24 rounded-full border-4 border-gold bg-navy-dark/80 flex flex-col items-center justify-center backdrop-blur-sm animate-pulse">
        <span class="font-heading font-black text-gold text-2xl">14+</span>
        <span class="font-body text-white/70 text-xs text-center leading-tight">Years<br/>Experience</span>
      </div>
    </div>

    <!-- Content -->
    <div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <!-- Eyebrow -->
      <div class="hero-enter-1 inline-flex items-center gap-2 bg-gold/20 border border-gold/40 rounded-full px-5 py-2 mb-6 backdrop-blur-sm">
        <span class="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
        <span class="font-body text-gold text-sm font-medium tracking-wider uppercase">Manchester, United Kingdom</span>
      </div>

      <!-- Main heading -->
      <h1 class="font-heading font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6">
        <span class="block hero-line-1">We Don't Just</span>
        <span class="block text-gold drop-shadow-lg hero-line-2">Develop Players.</span>
        <span class="block hero-line-3">We Build <span class="italic text-gold">Kings.</span></span>
      </h1>

      <!-- Subheadline -->
      <p class="hero-enter-3 font-body text-white/75 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
        For over 14 years, the <strong class="text-gold font-semibold">ID Method</strong> has placed players
        in the English Premier League and national teams across 5 countries.
        Technical foundations are the floor — character is the ceiling.
      </p>

      <!-- Stats row -->
      <div class="hero-enter-4 flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-10">
        <div v-for="stat in heroStats" :key="stat.label" class="flex flex-col items-center">
          <span class="font-heading font-black text-gold text-2xl md:text-3xl">{{ stat.value }}</span>
          <span class="font-body text-white/60 text-xs md:text-sm uppercase tracking-wider">{{ stat.label }}</span>
        </div>
      </div>

      <!-- CTAs -->
      <div class="hero-enter-5 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button @click="scrollTo('register')" class="btn-primary text-base px-10 py-4">
          Join the Academy
        </button>
        <button @click="scrollTo('founder')" class="btn-outline text-base px-10 py-4">
          Our Story
        </button>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
      <span class="font-body text-white/40 text-xs uppercase tracking-widest">Scroll</span>
      <svg class="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </div>
  </section>
</template>

<script setup lang="ts">
import heroImg from '../assets/IMG_1839.JPG'

const heroStats = [
  { value: '14+', label: 'Years' },
  { value: '5', label: 'National Teams' },
  { value: '10+', label: 'Pro Clubs' },
  { value: '1,000+', label: 'Players' },
]

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>
