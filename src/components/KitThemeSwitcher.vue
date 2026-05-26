<template>
  <button
    type="button"
    class="kit-switcher group"
    :aria-label="`Switch to ${nextTheme} kit theme`"
    @click="$emit('toggle')"
  >
    <img :src="nextKitImage" :alt="`${nextTheme} kit`" class="kit-switcher__image" />
    <span class="kit-switcher__shade"></span>

    <!-- Pitch centre-circle watermark -->
    <span class="kit-switcher__pitch">
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <circle cx="40" cy="40" r="20" stroke="white" stroke-opacity="0.35" stroke-width="1.5" fill="none"/>
        <circle cx="40" cy="40" r="2.5" fill="white" fill-opacity="0.5"/>
        <line x1="0" y1="40" x2="80" y2="40" stroke="white" stroke-opacity="0.25" stroke-width="1"/>
        <line x1="0" y1="10" x2="80" y2="10" stroke="white" stroke-opacity="0.15" stroke-width="1" stroke-dasharray="3 4"/>
        <line x1="0" y1="70" x2="80" y2="70" stroke="white" stroke-opacity="0.15" stroke-width="1" stroke-dasharray="3 4"/>
      </svg>
    </span>

    <!-- Football icon -->
    <span class="kit-switcher__ball">⚽</span>

    <span class="kit-switcher__label">{{ nextTheme }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import homeKitImg from '../assets/homekit.jpeg.jpeg'
import awayKitImg from '../assets/awaykit.jpeg.jpeg'

const props = defineProps<{
  currentTheme: 'Home' | 'Away'
}>()

defineEmits<{
  toggle: []
}>()

const nextTheme = computed(() => props.currentTheme === 'Home' ? 'Away' : 'Home')
const nextKitImage = computed(() => props.currentTheme === 'Home' ? awayKitImg : homeKitImg)
</script>