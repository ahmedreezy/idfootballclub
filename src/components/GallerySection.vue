<template>
  <section id="gallery" class="py-24 bg-navy relative overflow-hidden">
    <!-- Logo watermark -->
    <img
      :src="whiteLogo"
      alt=""
      aria-hidden="true"
      class="pointer-events-none select-none absolute -top-10 -right-10 w-72 h-72 rounded-full object-cover opacity-[0.05]"
    />
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

      <!-- Gallery Grid — curated preview -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div
          v-for="(photo, i) in previewPhotos"
          :key="photo.src"
          class="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-navy-dark cursor-pointer group"
          @click="openLightbox(i)"
        >
          <img
            :src="photo.src"
            :alt="photo.alt"
            loading="lazy"
            decoding="async"
            class="h-full w-full object-contain object-center p-1 transition-opacity duration-300 group-hover:opacity-90"
          />
          <div class="absolute inset-0 bg-navy-dark/0 group-hover:bg-navy-dark/55 transition-all duration-300 flex items-end p-3">
            <p class="opacity-0 group-hover:opacity-100 font-body text-white text-xs leading-snug transition-opacity duration-300">{{ photo.caption }}</p>
          </div>
        </div>
      </div>

      <!-- View All Button -->
      <div v-if="filteredPhotos.length > previewPhotos.length" class="mt-10 flex flex-col items-center gap-3">
        <p class="font-body text-white/40 text-sm">Showing {{ previewPhotos.length }} featured photos from {{ filteredPhotos.length }}</p>
        <button
          @click="openGallery"
          class="btn-outline-gold px-10 py-3 inline-flex items-center gap-3"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
          </svg>
          View More Photos
        </button>
      </div>
    </div>

  </section>

  <!-- Full gallery overlay + lightbox live outside the section so they can cover the whole viewport -->
  <Teleport to="body">

    <!-- ── Full Gallery Overlay ──────────────────────────────── -->
    <Transition
      enter-active-class="transition-all duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="galleryOpen" class="fixed inset-0 z-50 bg-navy-dark flex flex-col">

        <!-- Header bar -->
        <div class="flex-shrink-0 flex items-center justify-between gap-4 px-5 py-4 border-b border-white/10 bg-navy-dark/95 backdrop-blur-md">
          <div>
            <h3 class="font-heading font-bold text-white text-lg">Photo Gallery</h3>
            <p class="font-body text-white/40 text-xs mt-0.5">{{ filteredPhotos.length }} photos · {{ activeTab }}</p>
          </div>
          <div class="flex items-center gap-3">
            <!-- Desktop filter tabs -->
            <div class="hidden sm:flex gap-2">
              <button
                v-for="tab in tabs"
                :key="tab"
                @click="activeTab = tab"
                :class="[
                  'font-heading font-semibold text-xs px-4 py-1.5 rounded-full border transition-all duration-200',
                  activeTab === tab ? 'bg-gold text-navy border-gold' : 'text-white/60 border-white/20 hover:border-gold/40 hover:text-gold',
                ]"
              >{{ tab }}</button>
            </div>
            <button
              @click="closeGallery"
              class="rounded-full border border-white/20 bg-white/5 p-2.5 text-white/70 transition-colors hover:border-gold hover:text-gold"
              aria-label="Close gallery"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile filter tabs -->
        <div class="sm:hidden flex-shrink-0 flex gap-2 overflow-x-auto px-5 py-3 border-b border-white/10">
          <button
            v-for="tab in tabs"
            :key="tab"
            @click="activeTab = tab"
            :class="[
              'flex-shrink-0 font-heading font-semibold text-xs px-4 py-1.5 rounded-full border transition-all duration-200',
              activeTab === tab ? 'bg-gold text-navy border-gold' : 'text-white/60 border-white/20',
            ]"
          >{{ tab }}</button>
        </div>

        <!-- Scrollable photo grid -->
        <div class="flex-1 overflow-y-auto p-4 md:p-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
            <div
              v-for="(photo, i) in filteredPhotos"
              :key="photo.src"
              class="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-navy cursor-pointer group"
              @click="openLightboxFromGallery(i)"
            >
              <img
                :src="photo.src"
                :alt="photo.alt"
                loading="lazy"
                decoding="async"
                class="h-full w-full object-contain object-center p-1 transition-opacity duration-300 group-hover:opacity-90"
              />
              <div class="absolute inset-0 bg-navy-dark/0 group-hover:bg-navy-dark/50 transition-all duration-300 flex items-end p-2">
                <p class="opacity-0 group-hover:opacity-100 font-body text-white text-[11px] leading-tight transition-opacity duration-300">{{ photo.caption }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ── Lightbox ───────────────────────────────────────────── -->
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
        class="fixed inset-0 z-[60] bg-black/97 flex items-center justify-center p-4"
        @click.self="closeLightbox"
      >
        <button
          @click="closeLightbox"
          class="absolute top-5 right-5 rounded-full border border-white/20 bg-white/5 p-2.5 text-white/70 transition-colors hover:border-gold hover:text-gold z-10"
          aria-label="Close"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        <button
          @click="prevPhoto"
          class="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/5 p-3 text-white/70 transition-colors hover:border-gold hover:text-gold"
          aria-label="Previous photo"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <div class="max-w-5xl w-full flex flex-col items-center">
          <img
            :src="lightboxPhoto?.src"
            :alt="lightboxPhoto?.alt"
            class="max-h-[78vh] max-w-full object-contain rounded-xl"
          />
          <div class="mt-4 text-center">
            <p class="font-body text-white/70 text-sm">{{ lightboxPhoto?.caption }}</p>
            <p class="font-body text-white/35 text-xs mt-1">{{ lightboxIndex + 1 }} / {{ lightboxSource.length }}</p>
          </div>
        </div>
        <button
          @click="nextPhoto"
          class="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/5 p-3 text-white/70 transition-colors hover:border-gold hover:text-gold"
          aria-label="Next photo"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </Transition>

  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { galleryPhotos, type GalleryPhoto } from '../lib/galleryImages'
import whiteLogo from '../assets/whitelogo.jpg.png'

const PREVIEW_COUNT = 8
const featuredPhotoIndexes = [0, 8, 18, 31, 45, 62, 84, 110]

const tabs = ['All', 'Training', 'Match Day', 'Academy Life']
const activeTab = ref('All')
const galleryOpen = ref(false)
const lightboxOpen = ref(false)
const lightboxIndex = ref(0)
const lightboxSource = ref<GalleryPhoto[]>([])

const photos = galleryPhotos

const filteredPhotos = computed(() =>
  activeTab.value === 'All' ? photos : photos.filter(p => p.category === activeTab.value)
)

const featuredPhotos = computed(() =>
  featuredPhotoIndexes
    .map(index => photos[index])
    .filter((photo): photo is GalleryPhoto => Boolean(photo))
)
const previewPhotos = computed(() =>
  activeTab.value === 'All'
    ? featuredPhotos.value.slice(0, PREVIEW_COUNT)
    : filteredPhotos.value.slice(0, PREVIEW_COUNT)
)
const lightboxPhoto = computed(() => lightboxSource.value[lightboxIndex.value])

// ── Preview grid click → lightbox over preview
function openLightbox(i: number) {
  lightboxSource.value = previewPhotos.value
  lightboxIndex.value = i
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

// ── Full gallery click → lightbox over gallery overlay
function openLightboxFromGallery(i: number) {
  lightboxSource.value = filteredPhotos.value
  lightboxIndex.value = i
  lightboxOpen.value = true
}

function closeLightbox() {
  lightboxOpen.value = false
  if (!galleryOpen.value) document.body.style.overflow = ''
}

function prevPhoto() {
  lightboxIndex.value = (lightboxIndex.value - 1 + lightboxSource.value.length) % lightboxSource.value.length
}

function nextPhoto() {
  lightboxIndex.value = (lightboxIndex.value + 1) % lightboxSource.value.length
}

function openGallery() {
  galleryOpen.value = true
  document.body.style.overflow = 'hidden'
}

function closeGallery() {
  galleryOpen.value = false
  if (!lightboxOpen.value) document.body.style.overflow = ''
}
</script>
