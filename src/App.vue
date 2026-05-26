<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import TheNavbar from './components/TheNavbar.vue'
import HeroSection from './components/HeroSection.vue'
import StatsBar from './components/StatsBar.vue'
import AboutSection from './components/AboutSection.vue'
import FounderSection from './components/FounderSection.vue'
import VisionMission from './components/VisionMission.vue'
import WallOfFame from './components/WallOfFame.vue'
import OpportunitiesSection from './components/OpportunitiesSection.vue'
import GallerySection from './components/GallerySection.vue'
import RegistrationForm from './components/RegistrationForm.vue'
import ContactSection from './components/ContactSection.vue'
import TheFooter from './components/TheFooter.vue'
import KitThemeSwitcher from './components/KitThemeSwitcher.vue'

type KitTheme = 'home' | 'away'

const kitTheme = ref<KitTheme>('home')
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
      <AboutSection />
      <FounderSection />
      <VisionMission />
      <WallOfFame />
      <OpportunitiesSection />
      <GallerySection />
      <RegistrationForm />
      <ContactSection />
    </main>
    <TheFooter />
    <KitThemeSwitcher :current-theme="kitThemeLabel" @toggle="toggleKitTheme" />
  </div>
</template>
