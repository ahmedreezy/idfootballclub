<script setup lang="ts">
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
</script>

<template>
  <div class="min-h-screen bg-navy-dark">
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
  </div>
</template>
