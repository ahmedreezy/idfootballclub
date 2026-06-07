<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import TheNavbar from './components/TheNavbar.vue'
import HeroSection from './components/HeroSection.vue'
import StatsBar from './components/StatsBar.vue'
import UpcomingTrials from './components/UpcomingTrials.vue'
import AboutSection from './components/AboutSection.vue'
import FounderSection from './components/FounderSection.vue'
import VisionMission from './components/VisionMission.vue'
import WallOfFame from './components/WallOfFame.vue'
import TestimonialsSection from './components/TestimonialsSection.vue'
import OpportunitiesSection from './components/OpportunitiesSection.vue'
import GallerySection from './components/GallerySection.vue'
import RegistrationForm from './components/RegistrationForm.vue'
import ContactSection from './components/ContactSection.vue'
import TheFooter from './components/TheFooter.vue'
import KitThemeSwitcher from './components/KitThemeSwitcher.vue'
import { version as appVersion } from '../package.json'

type KitTheme = 'home' | 'away'

const kitTheme = ref<KitTheme>('away') // LOCKED: light mode deactivated — keep code, do not delete
const kitThemeLabel = computed(() => kitTheme.value === 'home' ? 'Home' : 'Away')

function toggleKitTheme() {
  kitTheme.value = kitTheme.value === 'home' ? 'away' : 'home'
}

onMounted(() => {
  const storedTheme = window.localStorage.getItem('idfc-kit-theme')
  if (storedTheme === 'home' || storedTheme === 'away') {
    kitTheme.value = storedTheme
  }
})

watch(kitTheme, (theme) => {
  window.localStorage.setItem('idfc-kit-theme', theme)
})
</script>

<template>
  <div class="min-h-screen bg-navy-dark text-white transition-colors duration-500" :data-kit-theme="kitTheme">
    <TheNavbar />
    <main>
      <HeroSection />
      <StatsBar />
      <UpcomingTrials />
      <AboutSection />
      <FounderSection />
      <VisionMission />
      <WallOfFame />
      <TestimonialsSection />
      <OpportunitiesSection />
      <GallerySection />
      <RegistrationForm />
      <ContactSection />
    </main>
    <TheFooter />
    <!-- KitThemeSwitcher deactivated — light mode disabled; component preserved for future use
    <KitThemeSwitcher :current-theme="kitThemeLabel" @toggle="toggleKitTheme" />
    -->
    <span class="fixed bottom-3 left-3 z-40 font-mono text-[10px] text-white/30 select-none pointer-events-none" aria-hidden="true">v{{ appVersion }}</span>
  </div>
</template>
