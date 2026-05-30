<template>
  <button
    type="button"
    class="kit-switcher group"
    :aria-label="`Switch to ${nextTheme === 'Home' ? 'dark' : 'light'} mode`"
    @click="$emit('toggle')"
  >
    <!-- Cartoon football shirt SVG -->
    <svg
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="kit-shirt"
    >
      <!-- Jersey body with sleeves -->
      <path
        d="M24 11 C24 17 36 17 36 11 L46 7 L58 21 L52 29 L46 25 L46 53 L14 53 L14 25 L8 29 L2 21 L14 7 Z"
        :fill="shirtFill"
        :stroke="shirtStroke"
        stroke-width="2"
        stroke-linejoin="round"
      />
      <!-- Collar accent line -->
      <path
        d="M24 11 C27 16 33 16 36 11"
        fill="none"
        :stroke="collarStroke"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>
    <span class="kit-switcher__label">{{ nextTheme }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  currentTheme: 'Home' | 'Away'
}>()

defineEmits<{
  toggle: []
}>()

const nextTheme = computed(() => props.currentTheme === 'Home' ? 'Away' : 'Home')

// Black shirt = switch to dark (Home), White shirt = switch to light (Away)
const shirtFill   = computed(() => nextTheme.value === 'Home' ? '#0d1117' : '#f5f5f5')
const shirtStroke = computed(() => nextTheme.value === 'Home' ? '#374151' : '#d1d5db')
const collarStroke = computed(() => nextTheme.value === 'Home' ? '#4b5563' : '#9ca3af')
</script>
