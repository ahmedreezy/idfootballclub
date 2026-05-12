<template>
  <section class="bg-gold py-10 stats-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-navy/30">
        <div
          v-for="(stat, i) in stats"
          :key="stat.label"
          v-reveal="i + 1"
          class="flex flex-col items-center text-center px-4"
        >
          <span class="font-heading font-black text-4xl md:text-5xl text-navy">
            {{ stat.displayValue }}
          </span>
          <span class="font-body text-navy/70 text-sm md:text-base font-medium uppercase tracking-wider mt-1">
            {{ stat.label }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

interface Stat {
  target: number
  suffix: string
  label: string
  displayValue: string
}

const stats = ref<Stat[]>([
  { target: 14, suffix: '+', label: 'Years Experience', displayValue: '0+' },
  { target: 5, suffix: '', label: 'National Teams', displayValue: '0' },
  { target: 10, suffix: '+', label: 'Professional Clubs', displayValue: '0+' },
  { target: 1000, suffix: '+', label: 'Players Developed', displayValue: '0+' },
])

const sectionEl = ref<HTMLElement | null>(null)
let animated = false

function animateCounters() {
  if (animated) return
  animated = true
  stats.value.forEach((stat, i) => {
    const duration = 1500
    const steps = 50
    const increment = stat.target / steps
    let current = 0
    const interval = setInterval(() => {
      current += increment
      if (current >= stat.target) {
        current = stat.target
        clearInterval(interval)
      }
      const display = stat.target >= 1000
        ? Math.round(current).toLocaleString()
        : Math.round(current).toString()
      stats.value[i].displayValue = display + stat.suffix
    }, duration / steps)
  })
}

onMounted(() => {
  const el = document.querySelector('.stats-section') as HTMLElement
  if (el) {
    sectionEl.value = el
    useIntersectionObserver(sectionEl, ([{ isIntersecting }]) => {
      if (isIntersecting) animateCounters()
    }, { threshold: 0.3 })
  }
})
</script>
