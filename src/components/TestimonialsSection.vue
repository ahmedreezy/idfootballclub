<template>
  <section class="relative overflow-hidden bg-navy py-24">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,0.12),transparent_34%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.06),transparent_30%)]"></div>
    <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div v-reveal class="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <div class="mb-3 flex items-center gap-3">
            <img
              :src="isLightMode ? blackLogo : whiteLogo"
              alt="ID All Stars Football Club"
              class="h-9 w-9 rounded-full border border-gold/40 bg-black object-contain"
            />
            <p class="section-subheading mb-0">Voices From The Sideline</p>
          </div>
          <h2 class="section-heading">Leadership, Pathways, Standards</h2>
          <div class="mt-4 h-1 w-16 rounded-full bg-gold"></div>
        </div>
        <p class="font-body max-w-xl text-white/60 md:text-right">Three voices around the touchline: founder vision, community football activism, and the operations standard that keeps sessions moving.</p>
      </div>

      <div class="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
        <div
          v-reveal.left
          class="relative overflow-hidden rounded-3xl border border-white/10 bg-navy-dark shadow-2xl shadow-black/30"
          @mouseenter="pause"
          @mouseleave="resume"
        >
          <div class="absolute left-0 top-0 h-1 w-full bg-white/10">
            <div class="h-full bg-gold transition-all duration-500" :style="{ width: `${progress}%` }"></div>
          </div>
          <div class="grid min-h-[420px] lg:grid-cols-[0.92fr_1.08fr]">
            <div class="relative min-h-72 overflow-hidden lg:min-h-full">
              <img :src="activeTestimonial.image" :alt="activeTestimonial.name" class="h-full w-full object-cover transition-all duration-700" />
              <div class="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/20 to-transparent"></div>
              <div class="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-navy-dark/70 p-4 backdrop-blur-md">
                <p class="font-heading text-gold text-xs uppercase tracking-widest">{{ activeTestimonial.result }}</p>
                <p class="font-body mt-1 text-sm text-white/70">{{ activeTestimonial.context }}</p>
              </div>
            </div>

            <div class="flex flex-col justify-between p-6 md:p-10">
              <div>
                <div class="mb-6 flex gap-1 text-gold" aria-label="5 star rating">
                  <span v-for="star in 5" :key="star">★</span>
                </div>
                <blockquote class="font-heading text-2xl font-bold leading-snug text-white md:text-3xl">
                  “{{ activeTestimonial.quote }}”
                </blockquote>
              </div>

              <div class="mt-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p class="font-heading text-xl font-bold text-white">{{ activeTestimonial.name }}</p>
                  <p class="font-body text-sm text-gold">{{ activeTestimonial.role }}</p>
                </div>
                <div class="flex items-center gap-3">
                  <button @click="previous" class="rounded-full border border-white/15 bg-white/5 p-3 text-white/70 transition-colors hover:border-gold hover:text-gold" aria-label="Previous testimonial">
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button @click="next" class="rounded-full border border-white/15 bg-white/5 p-3 text-white/70 transition-colors hover:border-gold hover:text-gold" aria-label="Next testimonial">
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-reveal.right class="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <button
            v-for="(story, index) in testimonials"
            :key="story.name"
            @click="setActive(index)"
            :class="[
              'rounded-2xl border p-5 text-left transition-all duration-300',
              activeIndex === index
                ? 'border-gold bg-gold text-navy shadow-xl shadow-gold/20'
                : 'border-white/10 bg-navy-dark hover:border-gold/50',
            ]"
          >
            <p :class="['font-heading text-sm font-black uppercase tracking-widest', activeIndex === index ? 'text-navy/60' : 'text-gold']">{{ story.result }}</p>
            <p :class="['font-heading mt-2 text-lg font-bold', activeIndex === index ? 'text-navy' : 'text-white']">{{ story.name }}</p>
            <p :class="['font-body mt-1 text-sm', activeIndex === index ? 'text-navy/70' : 'text-white/55']">{{ story.role }}</p>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { getGalleryPhoto } from '../lib/galleryImages'
import whiteLogo from '../assets/whitelogo.jpg.png'
import blackLogo from '../assets/black-logo.jpg.png'
import { useKitTheme } from '../lib/useKitTheme'

const { isLightMode } = useKitTheme()

const testimonials = [
  {
    quote: 'ID Football Club was built to give players more than sessions. We create standards, belief, and a pathway they can carry into every match and every room they enter.',
    name: 'ID',
    role: 'Founder',
    result: 'Founder vision',
    context: 'The method, values, and long-term player pathway behind the club.',
    image: getGalleryPhoto(6).src,
  },
  {
    quote: 'Football changes lives when the community can actually reach it. The work here is about opening doors, raising standards, and keeping young people connected to opportunity.',
    name: 'Lee Taylor',
    role: 'Football Activist',
    result: 'Community pathway',
    context: 'Advocacy, access, and the wider football network around the players.',
    image: getGalleryPhoto(24).src,
  },
  {
    quote: 'Good football needs good organisation. From registration to matchday communication, the aim is simple: families know the plan and coaches can focus on the players.',
    name: 'ASA',
    role: 'Operations Manager',
    result: 'Operational standard',
    context: 'Session planning, family communication, and matchday coordination.',
    image: getGalleryPhoto(42).src,
  },
]

const activeIndex = ref(0)
const progress = ref(0)
let timer: ReturnType<typeof setInterval> | undefined
let progressTimer: ReturnType<typeof setInterval> | undefined

const activeTestimonial = computed(() => testimonials[activeIndex.value])

function setActive(index: number) {
  activeIndex.value = index
  progress.value = 0
}

function next() {
  setActive((activeIndex.value + 1) % testimonials.length)
}

function previous() {
  setActive((activeIndex.value - 1 + testimonials.length) % testimonials.length)
}

function pause() {
  if (timer) clearInterval(timer)
  if (progressTimer) clearInterval(progressTimer)
}

function resume() {
  pause()
  timer = setInterval(next, 6500)
  progressTimer = setInterval(() => {
    progress.value = progress.value >= 100 ? 0 : progress.value + 2
  }, 130)
}

onMounted(resume)
onUnmounted(pause)
</script>
