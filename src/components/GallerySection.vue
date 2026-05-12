<template>
  <section id="gallery" class="py-24 bg-navy relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <p class="section-subheading mb-2">Behind the Scenes</p>
        <h2 class="section-heading">Gallery</h2>
        <div class="gold-divider"></div>
      </div>

      <!-- Filter Tabs -->
      <div class="flex flex-wrap justify-center gap-3 mb-10">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="activeTab = tab"
          :class="[
            'font-heading font-semibold text-sm px-5 py-2.5 rounded-full border transition-all duration-200',
            activeTab === tab
              ? 'bg-gold text-navy border-gold'
              : 'bg-transparent text-white/70 border-white/20 hover:border-gold/40 hover:text-gold',
          ]"
        >
          {{ tab }}
        </button>
      </div>

      <!-- Gallery Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        <div
          v-for="(photo, i) in filteredPhotos"
          :key="photo.src"
          :class="[
            'relative overflow-hidden rounded-xl cursor-pointer group',
            photo.tall ? 'row-span-2' : '',
            photo.wide ? 'col-span-2' : '',
          ]"
          @click="openLightbox(i)"
          style="aspect-ratio: 1/1"
        >
          <img
            :src="photo.src"
            :alt="photo.alt"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div class="absolute inset-0 bg-navy-dark/0 group-hover:bg-navy-dark/50 transition-all duration-300 flex items-center justify-center">
            <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center p-3">
              <svg class="w-8 h-8 text-gold mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
              </svg>
              <p class="font-body text-white text-xs">{{ photo.caption }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <Transition
      enter-active-class="transition-all duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="lightboxOpen"
        class="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
        @click.self="closeLightbox"
      >
        <button
          @click="closeLightbox"
          class="absolute top-6 right-6 text-white/70 hover:text-gold transition-colors"
        >
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        <button @click="prevPhoto" class="absolute left-4 text-white/70 hover:text-gold transition-colors p-2">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <div class="max-w-4xl max-h-[80vh] flex flex-col items-center">
          <img
            :src="filteredPhotos[lightboxIndex]?.src"
            :alt="filteredPhotos[lightboxIndex]?.alt"
            class="max-h-[70vh] max-w-full object-contain rounded-xl"
          />
          <p class="font-body text-white/70 text-sm mt-4">{{ filteredPhotos[lightboxIndex]?.caption }}</p>
        </div>
        <button @click="nextPhoto" class="absolute right-4 text-white/70 hover:text-gold transition-colors p-2">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </Transition>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import trainingImg from '../assets/training.png.png'
import img1v1 from '../assets/1v1.png.png'
import teamPhotoImg from '../assets/teamphoto.png.png'
import ourkitsImg from '../assets/ourkits.png.jpeg'
import subImg from '../assets/sub.png.png'
import winningImg from '../assets/winning.png.png'
import founderImg from '../assets/founder.png.png'

interface Photo {
  src: string
  alt: string
  caption: string
  category: string
  tall?: boolean
  wide?: boolean
}

const tabs = ['All', 'Training', 'Match Day', 'Academy Life']
const activeTab = ref('All')
const lightboxOpen = ref(false)
const lightboxIndex = ref(0)

const photos: Photo[] = [
  { src: trainingImg, alt: 'ID All Stars training', caption: 'High-intensity training session', category: 'Training' },
  { src: img1v1, alt: '1v1 drill', caption: 'ID Method — 1v1 mastery', category: 'Training' },
  { src: teamPhotoImg, alt: 'Team photo', caption: 'ID All Stars squad', category: 'Academy Life', wide: true },
  { src: ourkitsImg, alt: 'Our kits', caption: 'Proud to wear the badge', category: 'Academy Life' },
  { src: subImg, alt: 'Substitution moment', caption: 'Every player gets their moment', category: 'Match Day' },
  { src: winningImg, alt: 'Winning', caption: 'Champions — on and off the pitch', category: 'Match Day' },
  { src: founderImg, alt: 'Founder coaching', caption: 'The Kingmaker at work', category: 'Academy Life' },
  { src: trainingImg, alt: 'Skills drill', caption: 'Thousands of touches per session', category: 'Training' },
  { src: img1v1, alt: 'One-on-one', caption: 'Technical excellence', category: 'Training' },
  { src: teamPhotoImg, alt: 'Team huddle', caption: 'Building team spirit', category: 'Academy Life' },
  { src: winningImg, alt: 'Match celebration', caption: 'Celebrating success', category: 'Match Day' },
  { src: ourkitsImg, alt: 'Match day kit', caption: 'Match day ready', category: 'Match Day' },
]

const filteredPhotos = computed(() =>
  activeTab.value === 'All' ? photos : photos.filter(p => p.category === activeTab.value)
)

function openLightbox(i: number) {
  lightboxIndex.value = i
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

function closeLightbox() {
  lightboxOpen.value = false
  document.body.style.overflow = ''
}

function prevPhoto() {
  lightboxIndex.value = (lightboxIndex.value - 1 + filteredPhotos.value.length) % filteredPhotos.value.length
}

function nextPhoto() {
  lightboxIndex.value = (lightboxIndex.value + 1) % filteredPhotos.value.length
}
</script>
