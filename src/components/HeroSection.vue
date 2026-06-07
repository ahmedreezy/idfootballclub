<template>
  <section
    ref="homeSection"
    id="home"
    class="relative min-h-screen bg-navy-dark overflow-hidden flex flex-col"
  >
    <!-- Background: subtle radial gold glow + grid texture -->
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_65%_50%,rgba(212,175,55,0.07)_0%,transparent_70%)] pointer-events-none"></div>
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_10%_50%,rgba(15,27,76,0.8)_0%,transparent_70%)] pointer-events-none"></div>
    <!-- Gold shimmer line bottom -->
    <div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent z-10"></div>

    <!-- Two-column grid -->
    <div
      :key="animationKey"
      class="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 pt-40 pb-16 lg:pt-44 lg:pb-16 flex-1 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 lg:items-center"
    >

      <!-- LEFT: Copy -->
      <div class="text-center lg:text-left order-2 lg:order-1 flex flex-col justify-center">

        <!-- Eyebrow -->
        <div class="hero-enter-1 football-emphasis mb-5 inline-flex lg:self-start items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-2 backdrop-blur-sm mx-auto lg:mx-0">
          <span class="h-2 w-2 flex-shrink-0 rounded-full bg-gold animate-pulse"></span>
          <span class="font-body text-gold text-xs font-medium uppercase tracking-wider sm:text-sm">{{ heroSlides[activeSlide].tagline }}</span>
        </div>

        <!-- Main heading -->
        <h1 class="mb-5 font-heading text-[2rem] font-black leading-tight text-white sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
          <span class="block hero-line-1">We Don't Just</span>
          <span class="football-emphasis block text-gold drop-shadow-lg hero-line-2">Develop Players.</span>
          <span class="block hero-line-3">We Build <span class="football-emphasis inline-block italic text-gold">Kings.</span></span>
        </h1>

        <!-- Subheadline -->
        <p class="hero-enter-3 mb-7 font-body text-sm leading-relaxed text-white/70 sm:text-base md:text-lg mx-auto lg:mx-0 max-w-lg">
          For over 14 years, the <strong class="text-gold font-semibold">ID Method</strong> has placed players
          in the English Premier League and national teams across 5 countries.
          Technical foundations are the floor — character is the ceiling.
        </p>

        <!-- Stats row -->
        <div class="hero-enter-4 mb-7 flex flex-wrap items-center justify-center lg:justify-start gap-6 md:gap-10">
          <div v-for="stat in heroStats" :key="stat.label" class="football-emphasis flex flex-col items-center lg:items-start">
            <span class="font-heading font-black text-gold text-2xl md:text-3xl">{{ stat.value }}</span>
            <span class="font-body text-white/60 text-xs uppercase tracking-wider">{{ stat.label }}</span>
          </div>
        </div>

        <!-- CTAs -->
        <div class="hero-enter-5 flex flex-col items-center lg:items-start gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
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

        <!-- Floating tiles -->
        <div class="hero-enter-5 mt-8 w-full">
          <div class="flex gap-3 overflow-x-auto pb-2 sm:pb-0 sm:grid sm:grid-cols-3 sm:gap-3 snap-x snap-mandatory scrollbar-none">
            <button
              v-for="(moment, index) in matchMoments"
              :key="moment.title"
              @click="activeMoment = index"
              :class="[
                'football-emphasis flex-shrink-0 w-56 sm:w-auto snap-start rounded-2xl border p-3 backdrop-blur-md transition-all duration-300 text-left',
                activeMoment === index
                  ? 'border-gold bg-gold/15 shadow-lg shadow-gold/20'
                  : 'border-white/10 bg-white/5 hover:border-gold/40 hover:bg-white/10',
              ]"
            >
              <span class="font-heading text-gold text-xs uppercase tracking-widest">{{ moment.minute }}</span>
              <span class="block font-heading font-bold text-white mt-1 text-sm">{{ moment.title }}</span>
              <span class="block font-body text-white/55 text-xs mt-1">{{ moment.copy }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- RIGHT: Slideshow panel -->
      <div class="order-1 lg:order-2 relative flex items-center justify-center">

        <!-- 14+ badge — floats off top-left corner of the frame -->
        <div class="absolute -top-5 -left-5 lg:-top-7 lg:-left-7 w-20 h-20 lg:w-24 lg:h-24 rounded-full border-4 border-gold shadow-2xl shadow-gold/30 z-20 overflow-hidden">
          <img :src="whiteLogo" alt="ID All Stars" class="w-full h-full object-cover rounded-full" />
          <!-- 14+ overlay -->
          <div class="absolute inset-0 rounded-full bg-navy-dark/55 flex flex-col items-center justify-center">
            <span class="font-heading font-black text-gold text-xl lg:text-2xl leading-none">14+</span>
            <span class="font-body text-white/80 text-[10px] text-center leading-tight">Years</span>
          </div>
        </div>

        <!-- Photo frame -->
        <div class="photo-frame relative w-full max-w-sm lg:max-w-none overflow-hidden rounded-3xl shadow-2xl shadow-black/70 border border-white/10 mx-auto">
          <img
            v-for="(slide, index) in heroSlides"
            :key="slide.src"
            :src="slide.src"
            :alt="slide.alt"
            :class="['hero-slide', activeSlide === index ? 'is-active' : '']"
          />
          <!-- Bottom gradient -->
          <div class="absolute inset-0 bg-gradient-to-t from-navy-dark/50 via-transparent to-transparent pointer-events-none"></div>
          <!-- Gold ring inset -->
          <div class="absolute inset-0 rounded-3xl ring-1 ring-inset ring-gold/25 pointer-events-none"></div>

          <!-- Prev / Next arrows -->
          <button @click="previousSlide" class="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 border border-white/20 flex items-center justify-center text-white/70 hover:text-gold hover:border-gold/50 transition-colors backdrop-blur-sm z-10" aria-label="Previous photo">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <button @click="nextSlide" class="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 border border-white/20 flex items-center justify-center text-white/70 hover:text-gold hover:border-gold/50 transition-colors backdrop-blur-sm z-10" aria-label="Next photo">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </button>

          <!-- Slide dots -->
          <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            <button
              v-for="(slide, idx) in heroSlides"
              :key="idx"
              @click="activeSlide = idx"
              :class="['rounded-full transition-all duration-300', activeSlide === idx ? 'w-5 h-2 bg-gold' : 'w-2 h-2 bg-white/40 hover:bg-white/70']"
              :aria-label="`Go to slide ${idx + 1}`"
            />
          </div>
        </div>
      </div>

    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-10">
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
import whiteLogo from '../assets/whitelogo.jpg.png'

// Highlight videos — place highlights1.mp4, highlights2.mp4, highlights3.mp4 in src/assets/ to enable
const highlightVideos: string[] = []

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

const highlightVideos_unused = null // replaced above — keep for reference

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
  if (highlightVideos.length === 0) return // no videos uploaded yet
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
.photo-frame {
  aspect-ratio: 3 / 4;
}

@media (min-width: 1024px) {
  .photo-frame {
    aspect-ratio: 4 / 5;
  }
}

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
