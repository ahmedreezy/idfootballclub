<template>
  <section id="about" class="py-24 bg-navy-dark relative overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
    <div class="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section header -->
      <div class="text-center mb-16">
        <p class="section-subheading mb-2">Our Philosophy</p>
        <h2 class="section-heading">About ID All Stars</h2>
        <div class="gold-divider"></div>
      </div>

      <!-- Kingmaker Story -->
      <div class="grid lg:grid-cols-2 gap-12 items-center mb-20">
        <div class="relative overflow-hidden rounded-2xl shadow-2xl shadow-black/50 border border-white/10">
          <img
            v-for="(slide, index) in aboutSlides"
            :key="slide.src"
            :src="slide.src"
            :alt="slide.alt"
            loading="lazy"
            decoding="async"
            :class="[
              'absolute inset-0 h-full w-full object-cover transition-opacity duration-1000',
              activeSlide === index ? 'opacity-100' : 'opacity-0',
            ]"
          />
          <div class="relative h-96"></div>
          <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-dark/90 to-transparent p-5">
            <p class="font-heading text-sm uppercase tracking-widest text-gold">{{ aboutSlides[activeSlide].label }}</p>
            <p class="font-body mt-1 text-sm text-white/70">{{ aboutSlides[activeSlide].caption }}</p>
          </div>
          <div class="absolute left-5 top-5 flex gap-2">
            <button
              v-for="index in aboutProgressDots"
              :key="index"
              :class="[
                'h-1.5 rounded-full transition-all duration-300',
                Math.floor((activeSlide / aboutSlides.length) * aboutProgressDots) === index - 1 ? 'w-8 bg-gold' : 'w-3 bg-white/40',
              ]"
              aria-hidden="true"
            ></button>
          </div>
          <!-- Gold quote badge -->
          <div class="absolute -bottom-6 -right-6 bg-gold rounded-2xl p-5 shadow-xl max-w-xs hidden md:block">
            <p class="font-heading font-bold text-navy text-sm leading-snug italic">
              "If I cannot be a King,<br/>I will become a <strong>Kingmaker.</strong>"
            </p>
            <p class="font-body text-navy/70 text-xs mt-1">— Mr. ID, Founder</p>
          </div>
        </div>

        <div>
          <h3 class="font-heading font-bold text-2xl md:text-3xl text-white mb-6">
            The <span class="text-gold">Kingmaker</span> Story
          </h3>
          <div class="space-y-4 font-body text-white/75 leading-relaxed">
            <p>
              I grew up with a ball at my feet and a dream in my heart — to stand on the pitch
              as a professional player. For reasons only God knows, that specific path was not
              meant for me. But I realised early on that there is a different kind of power in
              football: the power of the <strong class="text-white">Kingmaker.</strong>
            </p>
            <p>
              Fourteen years ago, I started my journey not to chase the spotlight, but to build
              the lights. I chose <strong class="text-gold">ID</strong> as
              the emblem of this journey. In the football world, <strong class="text-gold">ID</strong>
              became my mission: <em>Identification of Stars.</em>
            </p>
            <p>
              My success isn't measured by goals scored, but by the players I have helped reach
              the highest levels of the game — from the English Premier League to five national teams.
            </p>
            <blockquote class="border-l-4 border-gold pl-4 mt-6 italic text-white/90 text-lg">
              "Technical foundations are the floor, but character is the ceiling."
            </blockquote>
          </div>
        </div>
      </div>

      <!-- The ID Method -->
      <div>
        <div class="text-center mb-12">
          <p class="section-subheading mb-2">Our Framework</p>
          <h2 class="section-heading">The ID Method</h2>
          <div class="gold-divider"></div>
          <p class="font-body text-white/60 mt-4 max-w-xl mx-auto">
            Three interlocking pillars that develop complete athletes — on and off the pitch.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <div v-for="pillar in pillars" :key="pillar.title" class="card group">
            <div class="w-14 h-14 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
              <span class="text-2xl">{{ pillar.icon }}</span>
            </div>
            <h4 class="font-heading font-bold text-xl text-white mb-3">{{ pillar.title }}</h4>
            <p class="font-body text-white/65 leading-relaxed text-sm">{{ pillar.description }}</p>
            <div class="mt-4 pt-4 border-t border-white/10">
              <ul class="space-y-1">
                <li v-for="point in pillar.points" :key="point" class="flex items-center gap-2 font-body text-white/55 text-sm">
                  <span class="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0"></span>
                  {{ point }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { galleryPhotos } from '../lib/galleryImages'

const aboutLabels = [
  { label: 'High repetition', caption: 'Technical standards built through thousands of touches.' },
  { label: 'First touch', caption: 'Ball mastery, scanning, and pressure-based decisions.' },
  { label: 'Togetherness', caption: 'A demanding environment with care at the centre.' },
  { label: 'Game ready', caption: 'Training details carried into competitive moments.' },
]

// Pick 5 photos spread evenly across the full gallery for the About section slideshow
const ABOUT_COUNT = 5
const aboutStep = Math.max(1, Math.floor(galleryPhotos.length / ABOUT_COUNT))
const aboutSlides = galleryPhotos
  .filter((_, i) => i % aboutStep === 0)
  .slice(0, ABOUT_COUNT)
  .map((photo, index) => ({
    src: photo.src,
    alt: photo.alt,
    label: aboutLabels[index % aboutLabels.length].label,
    caption: aboutLabels[index % aboutLabels.length].caption,
  }))
const aboutProgressDots = aboutSlides.length

const activeSlide = ref(0)
let slideTimer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  slideTimer = setInterval(() => {
    activeSlide.value = (activeSlide.value + 1) % aboutSlides.length
  }, 4200)
})

onUnmounted(() => {
  if (slideTimer) clearInterval(slideTimer)
})

const pillars = [
  {
    icon: '⚽',
    title: 'Technical Excellence',
    description: 'High-repetition drills with thousands of ball touches per session build muscle memory and elite first touch.',
    points: ['1,000+ touches per session', 'Dribbling mastery', 'Passing & receiving', 'Finishing technique'],
  },
  {
    icon: '🧠',
    title: 'Tactical Awareness',
    description: 'Cognitive loading drills train players to read the game, make fast decisions, and understand team systems.',
    points: ['Positional intelligence', 'Decision-making under pressure', 'Team shape & movement', 'Game-film analysis'],
  },
  {
    icon: '🏆',
    title: 'The Character Matrix',
    description: 'Monthly assessments go beyond dribbling. We measure the qualities that define great humans as well as great players.',
    points: ['Punctuality & discipline', 'Leadership & selflessness', 'Love for teammates', 'Right orientation & mentality'],
  },
]
</script>
