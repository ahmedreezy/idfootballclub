<template>
  <section
    ref="homeSection"
    id="home"
    class="relative min-h-screen flex items-start md:items-center justify-center pt-28 pb-16 md:pb-24"
  >
    <!-- Background Image -->
    <div class="absolute inset-0">
      <img
        v-for="(slide, index) in heroSlides"
        :key="slide.src"
        :src="slide.src"
        :alt="slide.alt"
        :class="['hero-slide', activeSlide === index ? 'is-active' : '']"
      />
      <!-- Dark overlay gradient -->
      <div class="hero-overlay absolute inset-0"></div>
      <div class="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy-dark via-navy-dark/40 to-transparent"></div>
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
    <div :key="animationKey" class="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8 text-center">
      <!-- Eyebrow -->
      <div class="hero-enter-1 football-emphasis mx-auto mb-3 inline-flex max-w-[min(100%,21rem)] items-center justify-center gap-2 rounded-2xl border border-gold/40 bg-gold/20 px-4 py-2 backdrop-blur-sm sm:mb-5 sm:max-w-none sm:rounded-full sm:px-5">
        <span class="h-2 w-2 flex-shrink-0 rounded-full bg-gold animate-pulse"></span>
        <span class="font-body text-gold text-xs font-medium uppercase leading-snug tracking-wider sm:text-sm">{{ heroSlides[activeSlide].tagline }}</span>
      </div>

      <!-- Main heading -->
      <h1 class="mb-3 font-heading text-[1.6rem] font-black leading-snug text-white sm:mb-5 sm:text-4xl sm:leading-[1.08] md:text-6xl lg:text-7xl">
        <span class="block hero-line-1">We Don't Just</span>
        <span class="football-emphasis block text-gold drop-shadow-lg hero-line-2">Develop Players.</span>
        <span class="block hero-line-3">We Build <span class="football-emphasis inline-block italic text-gold">Kings.</span></span>
      </h1>

      <!-- Subheadline -->
      <p class="hero-enter-3 mx-auto mb-4 max-w-2xl font-body text-sm leading-relaxed text-white/75 sm:mb-8 sm:text-base md:text-xl">
        For over 14 years, the <strong class="text-gold font-semibold">ID Method</strong> has placed players
        in the English Premier League and national teams across 5 countries.
        Technical foundations are the floor — character is the ceiling.
      </p>

      <!-- Stats row -->
      <div class="hero-enter-4 mb-4 flex flex-wrap items-center justify-center gap-3 sm:mb-8 md:gap-8">
        <div v-for="stat in heroStats" :key="stat.label" class="football-emphasis flex flex-col items-center">
          <span class="font-heading font-black text-gold text-2xl md:text-3xl">{{ stat.value }}</span>
          <span class="font-body text-white/60 text-xs md:text-sm uppercase tracking-wider">{{ stat.label }}</span>
        </div>
      </div>

      <!-- CTAs -->
      <div class="hero-enter-5 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
        <button @click="scrollTo('register')" class="btn-primary w-full max-w-xs px-8 py-3 text-sm sm:w-auto sm:px-10 sm:py-4 sm:text-base">
          Join the Academy
        </button>
        <button @click="openHighlights" class="btn-outline-gold inline-flex w-full max-w-xs items-center justify-center gap-2 px-8 py-3 text-sm sm:w-auto sm:px-10 sm:py-4 sm:text-base">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
          Watch Highlights
        </button>
        <button @click="scrollTo('founder')" class="btn-outline w-full max-w-xs px-8 py-3 text-sm sm:w-auto sm:px-10 sm:py-4 sm:text-base">
          Our Story
        </button>
      </div>

      <!-- Live highlights — floating tiles -->
      <div class="hero-enter-5 mt-10 w-full">
        <div class="mx-auto max-w-6xl flex gap-3 overflow-x-auto pb-2 sm:pb-0 sm:grid sm:grid-cols-3 sm:gap-4 snap-x snap-mandatory scrollbar-none">
          <button
            v-for="(moment, index) in matchMoments"
            :key="moment.title"
            @click="activeMoment = index"
            :class="[
              'football-emphasis flex-shrink-0 w-64 sm:w-auto snap-start rounded-2xl border p-4 backdrop-blur-md transition-all duration-300 text-left',
              activeMoment === index
                ? 'border-gold bg-gold/15 shadow-lg shadow-gold/20'
                : 'border-white/15 bg-navy-dark/45 hover:border-gold/50 hover:bg-navy-dark/65',
            ]"
          >
            <span class="font-heading text-gold text-xs uppercase tracking-widest">{{ moment.minute }}</span>
            <span class="block font-heading font-bold text-white mt-1">{{ moment.title }}</span>
            <span class="block font-body text-white/60 text-sm mt-1">{{ moment.copy }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
      <span class="font-body text-white/40 text-xs uppercase tracking-widest">Scroll</span>
      <svg class="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </div>

    <Teleport to="body">
      <Transition
        enter-active-class="transition-all duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-all duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="highlightOpen"
          class="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          @click.self="highlightOpen = false"
        >
          <div class="w-full max-w-4xl overflow-hidden rounded-3xl border border-gold/30 bg-navy-dark shadow-2xl shadow-black/60">
            <!-- Highlight label bar -->
            <div class="flex items-center justify-between px-5 py-3 border-b border-white/10">
              <div class="flex items-center gap-2">
                <span class="h-2 w-2 rounded-full bg-gold animate-pulse"></span>
                <span class="font-heading text-xs font-bold uppercase tracking-widest text-gold">Highlights Reel</span>
              </div>
              <span class="font-body text-xs text-white/50">{{ currentHighlightIndex + 1 }} / {{ highlightVideos.length }}</span>
            </div>
            <div class="relative aspect-video bg-black">
              <video
                ref="videoEl"
                :key="currentHighlightIndex"
                :src="highlightVideos[currentHighlightIndex]"
                class="h-full w-full object-contain"
                controls
                playsinline
                preload="metadata"
              />
            </div>
          </div>
          <button
            @click="highlightOpen = false"
            class="absolute right-5 top-5 rounded-full border border-white/20 bg-white/10 p-3 text-white/80 transition-colors hover:border-gold hover:text-gold"
            aria-label="Close highlights"
          >
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { galleryPhotos } from '../lib/galleryImages'
import highlights1 from '../assets/highlights1.mp4'
import highlights2 from '../assets/highlights2.mp4'
import highlights3 from '../assets/highlights3.mp4'

const heroTaglines = [
  'Manchester, United Kingdom',
  'Elite training. Real standards.',
  'Pathways from grassroots to pro clubs',
  'Player moments, captured live',
]

const heroSlides = galleryPhotos.map((photo, index) => ({
  src: photo.src,
  alt: photo.alt,
  tagline: heroTaglines[index % heroTaglines.length],
}))
const heroProgressDots = 8

const heroStats = [
  { value: '14+', label: 'Years' },
  { value: '5', label: 'National Teams' },
  { value: '10+', label: 'Pro Clubs' },
  { value: '1,000+', label: 'Players' },
]

const matchMoments = [
  { minute: '01', title: 'First touch sharpness', copy: 'High-repetition ball mastery from the first whistle.' },
  { minute: '02', title: 'Game intelligence', copy: 'Scanning, timing, and confident decisions under pressure.' },
  { minute: '03', title: 'Character finish', copy: 'Resilience, discipline, and standards that travel beyond football.' },
]

const highlightVideos = [highlights1, highlights2, highlights3]

const activeSlide = ref(0)
const activeMoment = ref(0)
const highlightOpen = ref(false)
const currentHighlightIndex = ref(-1)
const videoEl = ref<HTMLVideoElement | null>(null)
const homeSection = ref<HTMLElement | null>(null)
const animationKey = ref(0)
let slideTimer: ReturnType<typeof setInterval> | undefined
let momentTimer: ReturnType<typeof setInterval> | undefined
let emphasisTimer: ReturnType<typeof setInterval> | undefined
let homeObserver: IntersectionObserver | undefined
let homeVisible = false

function replayHomeAnimation() {
  animationKey.value += 1
}

function openHighlights() {
  // Advance to next video each time the button is clicked (cycles 0→1→2→0…)
  currentHighlightIndex.value = (currentHighlightIndex.value + 1) % highlightVideos.length
  highlightOpen.value = true
}

watch(highlightOpen, (open) => {
  if (open) {
    // Wait a tick for the video element to mount, then autoplay
    setTimeout(() => videoEl.value?.play(), 100)
  } else {
    if (videoEl.value) {
      videoEl.value.pause()
      videoEl.value.currentTime = 0
    }
  }
})

function nextSlide() {
  activeSlide.value = (activeSlide.value + 1) % heroSlides.length
}

function previousSlide() {
  activeSlide.value = (activeSlide.value - 1 + heroSlides.length) % heroSlides.length
}

onMounted(() => {
  slideTimer = setInterval(nextSlide, 5500)
  momentTimer = setInterval(() => {
    activeMoment.value = (activeMoment.value + 1) % matchMoments.length
  }, 3200)
  emphasisTimer = setInterval(replayHomeAnimation, 10000)

  homeObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !homeVisible) {
        replayHomeAnimation()
      }
      homeVisible = entry.isIntersecting
    },
    { threshold: 0.55 }
  )

  if (homeSection.value) {
    homeObserver.observe(homeSection.value)
  }

  window.addEventListener('idfc:replay-home', replayHomeAnimation)
})

onUnmounted(() => {
  if (slideTimer) clearInterval(slideTimer)
  if (momentTimer) clearInterval(momentTimer)
  if (emphasisTimer) clearInterval(emphasisTimer)
  homeObserver?.disconnect()
  window.removeEventListener('idfc:replay-home', replayHomeAnimation)
})

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<style scoped>
.hero-slide {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  opacity: 0;
  transition: opacity 1.4s ease-in-out;
  will-change: transform, opacity;
}

.hero-slide.is-active {
  opacity: 1;
  animation: kenburns-a 7s ease-out forwards;
}

.hero-slide:nth-child(even).is-active {
  animation: kenburns-b 7s ease-out forwards;
}

@keyframes kenburns-a {
  from { transform: scale(1) translate(0, 0); }
  to   { transform: scale(1.13) translate(-2%, -1%); }
}

@keyframes kenburns-b {
  from { transform: scale(1) translate(0, 0); }
  to   { transform: scale(1.13) translate(2%, 1%); }
}
</style>
