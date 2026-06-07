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

// Show the shirt of the theme you'll switch INTO:
// Clicking shows Home (white shirt) or Away (navy shirt)
const shirtFill    = computed(() => nextTheme.value === 'Home' ? '#f5f5f5' : '#0d2461')
const shirtStroke  = computed(() => nextTheme.value === 'Home' ? '#d1d5db' : '#1a3a7c')
const collarStroke = computed(() => nextTheme.value === 'Home' ? '#9ca3af' : '#2451a8')
</script>
